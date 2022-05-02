from pathlib import Path

from custom_command import LinkCountingCommand
from openwpm.command_sequence import CommandSequence
from openwpm.commands.browser_commands import GetCommand
from openwpm.config import BrowserParams, ManagerParams, path_to_str, str_to_path
from openwpm.storage.sql_provider import SQLiteStorageProvider
from openwpm.task_manager import TaskManager

from dataclasses import dataclass, field
from dataclasses_json import config as DCJConfig

import pandas as pd # Used for reading domains from csv file

# The list of sites that we wish to crawl
NUM_BROWSERS = 1
# Extract sites to visit from csv file
sites = list(pd.read_csv('/home/kali/Desktop/Project/OpenWPM/datadir/sources/Facebook Top 1000.csv')['url_domain'])

# Loads the default ManagerParams
# and NUM_BROWSERS copies of the default BrowserParams

manager_params = ManagerParams(num_browsers=NUM_BROWSERS)
browser_params = [BrowserParams(display_mode="headless") for _ in range(NUM_BROWSERS)]

# Update browser configuration (use this for per-browser settings)
for browser_param in browser_params:
    # Record HTTP Requests and Responses
    browser_param.http_instrument = True
    # Record cookie changes
    browser_param.cookie_instrument = True
    # Record Navigations
    browser_param.navigation_instrument = True
    # Record JS Web API calls
    browser_param.js_instrument = True
    # Record the callstack of all WebRequests made
    browser_param.callstack_instrument = True
    # Record DNS resolution
    browser_param.dns_instrument = True

    # Record any javascript ran on the page
    # browser_param.save_content = "script"
    # Performs action to make platform being detected as a bot
    browser_param.bot_mitigation = True
    # Accepts all third party cookies
    browser_param.tp_cookies = 'always'
    # Turn off donottrack in browser
    browser_param.donottrack = 'False'
    # Load a browser profile (not used for control crawls)
    # browser_param.seed_tar = '/home/kali/Desktop/Project/OpenWPM/datadir/Profiles/PROFILE_NAME.tar.gz'


# Update TaskManager configuration (use this for crawl-wide settings)
manager_params.data_directory = Path("./datadir/")
manager_params.log_path = Path("./datadir/openwpm.log")

# memory_watchdog and process_watchdog are useful for large scale cloud crawls.
# Please refer to docs/Configuration.md#platform-configuration-options for more information
# manager_params.memory_watchdog = True
# manager_params.process_watchdog = True


# Commands time out by default after 60 seconds
with TaskManager(
    manager_params,
    browser_params,
    SQLiteStorageProvider(Path("./datadir/crawl-data.sqlite")),
    None,
) as manager:
    # Visits the sites
    for index, site in enumerate(sites):

        def callback(success: bool, val: str = site) -> None:
            print(
                f"CommandSequence for {val} ran {'successfully' if success else 'unsuccessfully'}"
            )

        # Parallelize sites over all number of browsers set above.
        command_sequence = CommandSequence(
            site,
            reset=True, # Enables a stateless crawl
            site_rank=index,
            callback=callback,
        )

        # Start by visiting the page
        command_sequence.append_command(GetCommand(url=site, sleep=3), timeout=60)

        # Run commands across all browsers (simple parallelization)
        manager.execute_command_sequence(command_sequence)
