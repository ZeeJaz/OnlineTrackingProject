/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../webext-instrumentation/build/module/background/cookie-instrument.js":
/*!******************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/cookie-instrument.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformCookieObjectToMatchOpenWPMSchema": () => (/* binding */ transformCookieObjectToMatchOpenWPMSchema),
/* harmony export */   "CookieInstrument": () => (/* binding */ CookieInstrument)
/* harmony export */ });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");



const transformCookieObjectToMatchOpenWPMSchema = (cookie) => {
    const javascriptCookie = {};
    // Expiry time (in seconds)
    // May return ~Max(int64). I believe this is a session
    // cookie which doesn't expire. Sessions cookies with
    // non-max expiry time expire after session or at expiry.
    const expiryTime = cookie.expirationDate; // returns seconds
    let expiryTimeString;
    const maxInt64 = 9223372036854776000;
    if (!cookie.expirationDate || expiryTime === maxInt64) {
        expiryTimeString = "9999-12-31T21:59:59.000Z";
    }
    else {
        const expiryTimeDate = new Date(expiryTime * 1000); // requires milliseconds
        expiryTimeString = expiryTimeDate.toISOString();
    }
    javascriptCookie.expiry = expiryTimeString;
    javascriptCookie.is_http_only = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.boolToInt)(cookie.httpOnly);
    javascriptCookie.is_host_only = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.boolToInt)(cookie.hostOnly);
    javascriptCookie.is_session = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.boolToInt)(cookie.session);
    javascriptCookie.host = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.domain);
    javascriptCookie.is_secure = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.boolToInt)(cookie.secure);
    javascriptCookie.name = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.name);
    javascriptCookie.path = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.path);
    javascriptCookie.value = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.value);
    javascriptCookie.same_site = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.sameSite);
    javascriptCookie.first_party_domain = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.firstPartyDomain);
    javascriptCookie.store_id = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(cookie.storeId);
    javascriptCookie.time_stamp = new Date().toISOString();
    return javascriptCookie;
};
class CookieInstrument {
    dataReceiver;
    onChangedListener;
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        // Instrument cookie changes
        this.onChangedListener = async (changeInfo) => {
            const eventType = changeInfo.removed ? "deleted" : "added-or-changed";
            const update = {
                record_type: eventType,
                change_cause: changeInfo.cause,
                browser_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid,
                event_ordinal: (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)(),
                ...transformCookieObjectToMatchOpenWPMSchema(changeInfo.cookie),
            };
            this.dataReceiver.saveRecord("javascript_cookies", update);
        };
        browser.cookies.onChanged.addListener(this.onChangedListener);
    }
    async saveAllCookies(crawlID) {
        const allCookies = await browser.cookies.getAll({});
        await Promise.all(allCookies.map((cookie) => {
            const update = {
                record_type: "manual-export",
                browser_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid,
                ...transformCookieObjectToMatchOpenWPMSchema(cookie),
            };
            return this.dataReceiver.saveRecord("javascript_cookies", update);
        }));
    }
    cleanup() {
        if (this.onChangedListener) {
            browser.cookies.onChanged.removeListener(this.onChangedListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWluc3RydW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSzlELE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxFQUFzQixDQUFDO0lBRWhELDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQscURBQXFEO0lBQ3JELHlEQUF5RDtJQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCO0lBQzVELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNyRCxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztLQUMvQztTQUFNO1FBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzVFLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNqRDtJQUNELGdCQUFnQixDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxR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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/dns-instrument.js":
/*!***************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/dns-instrument.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DnsInstrument": () => (/* binding */ DnsInstrument)
/* harmony export */ });
/* harmony import */ var _lib_pending_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pending-response */ "../webext-instrumentation/build/module/lib/pending-response.js");
/* harmony import */ var _http_instrument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-instrument */ "../webext-instrumentation/build/module/background/http-instrument.js");


class DnsInstrument {
    dataReceiver;
    onCompleteListener;
    pendingResponses = {};
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        const filter = { urls: ["<all_urls>"], types: _http_instrument__WEBPACK_IMPORTED_MODULE_1__.allTypes };
        const requestStemsFromExtension = (details) => {
            return (details.originUrl &&
                details.originUrl.indexOf("moz-extension://") > -1 &&
                details.originUrl.includes("fakeRequest"));
        };
        /*
         * Attach handlers to event listeners
         */
        this.onCompleteListener = (details) => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnCompletedEventDetails(details);
            this.onCompleteDnsHandler(details, crawlID);
        };
        browser.webRequest.onCompleted.addListener(this.onCompleteListener, filter);
    }
    cleanup() {
        if (this.onCompleteListener) {
            browser.webRequest.onCompleted.removeListener(this.onCompleteListener);
        }
    }
    getPendingResponse(requestId) {
        if (!this.pendingResponses[requestId]) {
            this.pendingResponses[requestId] = new _lib_pending_response__WEBPACK_IMPORTED_MODULE_0__.PendingResponse();
        }
        return this.pendingResponses[requestId];
    }
    handleResolvedDnsData(dnsRecordObj, dataReceiver) {
        // Curring the data returned by API call.
        return function (record) {
            // Get data from API call
            dnsRecordObj.addresses = record.addresses.toString();
            dnsRecordObj.canonical_name = record.canonicalName;
            dnsRecordObj.is_TRR = record.isTRR;
            // Send data to main OpenWPM data aggregator.
            dataReceiver.saveRecord("dns_responses", dnsRecordObj);
        };
    }
    async onCompleteDnsHandler(details, crawlID) {
        // Create and populate DnsResolve object
        const dnsRecord = {};
        dnsRecord.browser_id = crawlID;
        dnsRecord.request_id = Number(details.requestId);
        dnsRecord.used_address = details.ip;
        const currentTime = new Date(details.timeStamp);
        dnsRecord.time_stamp = currentTime.toISOString();
        // Query DNS API
        const url = new URL(details.url);
        dnsRecord.hostname = url.hostname;
        const dnsResolve = browser.dns.resolve(dnsRecord.hostname, [
            "canonical_name",
        ]);
        dnsResolve.then(this.handleResolvedDnsData(dnsRecord, this.dataReceiver));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5zLWluc3RydW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9kbnMtaW5zdHJ1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzdDLE1BQU0sT0FBTyxhQUFhO0lBQ1AsWUFBWSxDQUFDO0lBQ3RCLGtCQUFrQixDQUFDO0lBQ25CLGdCQUFnQixHQUVwQixFQUFFLENBQUM7SUFFUCxZQUFZLFlBQVk7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVNLEdBQUcsQ0FBQyxPQUFPO1FBQ2hCLE1BQU0sTUFBTSxHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUV4RSxNQUFNLHlCQUF5QixHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDNUMsT0FBTyxDQUNMLE9BQU8sQ0FBQyxTQUFTO2dCQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQzFDLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRjs7V0FFRztRQUNILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE9BQTBDLEVBQUUsRUFBRTtZQUN2RSxxQ0FBcUM7WUFDckMsSUFBSSx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDdEMsT0FBTzthQUNSO1lBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRSxlQUFlLENBQUMsOEJBQThCLENBQUMs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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/http-instrument.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/http-instrument.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allTypes": () => (/* binding */ allTypes),
/* harmony export */   "HttpInstrument": () => (/* binding */ HttpInstrument)
/* harmony export */ });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/http-post-parser */ "../webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony import */ var _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/pending-request */ "../webext-instrumentation/build/module/lib/pending-request.js");
/* harmony import */ var _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/pending-response */ "../webext-instrumentation/build/module/lib/pending-response.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");






/**
 * Note: Different parts of the desired information arrives in different events as per below:
 * request = headers in onBeforeSendHeaders + body in onBeforeRequest
 * response = headers in onCompleted + body via a onBeforeRequest filter
 * redirect = original request headers+body, followed by a onBeforeRedirect and then a new set of request headers+body and response headers+body
 * Docs: https://developer.mozilla.org/en-US/docs/User:wbamberg/webRequest.RequestDetails
 */
const allTypes = [
    "beacon",
    "csp_report",
    "font",
    "image",
    "imageset",
    "main_frame",
    "media",
    "object",
    "object_subrequest",
    "ping",
    "script",
    "speculative",
    "stylesheet",
    "sub_frame",
    "web_manifest",
    "websocket",
    "xml_dtd",
    "xmlhttprequest",
    "xslt",
    "other",
];

class HttpInstrument {
    dataReceiver;
    pendingRequests = {};
    pendingResponses = {};
    onBeforeRequestListener;
    onBeforeSendHeadersListener;
    onBeforeRedirectListener;
    onCompletedListener;
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID, saveContentOption) {
        const filter = { urls: ["<all_urls>"], types: allTypes };
        const requestStemsFromExtension = (details) => {
            return (details.originUrl && details.originUrl.indexOf("moz-extension://") > -1);
        };
        /*
         * Attach handlers to event listeners
         */
        this.onBeforeRequestListener = (details) => {
            const blockingResponseThatDoesNothing = {};
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return blockingResponseThatDoesNothing;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeRequestEventDetails(details);
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnBeforeRequestEventDetails(details);
            if (this.shouldSaveContent(saveContentOption, details.type)) {
                pendingResponse.addResponseResponseBodyListener(details);
            }
            return blockingResponseThatDoesNothing;
        };
        browser.webRequest.onBeforeRequest.addListener(this.onBeforeRequestListener, filter, this.isContentSavingEnabled(saveContentOption)
            ? ["requestBody", "blocking"]
            : ["requestBody"]);
        this.onBeforeSendHeadersListener = (details) => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeSendHeadersEventDetails(details);
            this.onBeforeSendHeadersHandler(details, crawlID, (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)());
        };
        browser.webRequest.onBeforeSendHeaders.addListener(this.onBeforeSendHeadersListener, filter, ["requestHeaders"]);
        this.onBeforeRedirectListener = (details) => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            this.onBeforeRedirectHandler(details, crawlID, (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)());
        };
        browser.webRequest.onBeforeRedirect.addListener(this.onBeforeRedirectListener, filter, ["responseHeaders"]);
        this.onCompletedListener = (details) => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnCompletedEventDetails(details);
            this.onCompletedHandler(details, crawlID, (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)(), saveContentOption);
        };
        browser.webRequest.onCompleted.addListener(this.onCompletedListener, filter, ["responseHeaders"]);
    }
    cleanup() {
        if (this.onBeforeRequestListener) {
            browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestListener);
        }
        if (this.onBeforeSendHeadersListener) {
            browser.webRequest.onBeforeSendHeaders.removeListener(this.onBeforeSendHeadersListener);
        }
        if (this.onBeforeRedirectListener) {
            browser.webRequest.onBeforeRedirect.removeListener(this.onBeforeRedirectListener);
        }
        if (this.onCompletedListener) {
            browser.webRequest.onCompleted.removeListener(this.onCompletedListener);
        }
    }
    isContentSavingEnabled(saveContentOption) {
        if (saveContentOption === true) {
            return true;
        }
        if (saveContentOption === false) {
            return false;
        }
        return this.saveContentResourceTypes(saveContentOption).length > 0;
    }
    saveContentResourceTypes(saveContentOption) {
        return saveContentOption.split(",");
    }
    /**
     * We rely on the resource type to filter responses
     * See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
     *
     * @param saveContentOption
     * @param resourceType
     */
    shouldSaveContent(saveContentOption, resourceType) {
        if (saveContentOption === true) {
            return true;
        }
        if (saveContentOption === false) {
            return false;
        }
        return this.saveContentResourceTypes(saveContentOption).includes(resourceType);
    }
    getPendingRequest(requestId) {
        if (!this.pendingRequests[requestId]) {
            this.pendingRequests[requestId] = new _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__.PendingRequest();
        }
        return this.pendingRequests[requestId];
    }
    getPendingResponse(requestId) {
        if (!this.pendingResponses[requestId]) {
            this.pendingResponses[requestId] = new _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__.PendingResponse();
        }
        return this.pendingResponses[requestId];
    }
    /*
     * HTTP Request Handler and Helper Functions
     */
    async onBeforeSendHeadersHandler(details, crawlID, eventOrdinal) {
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined, url: undefined };
        const update = {};
        update.incognito = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.boolToInt)(tab.incognito);
        update.browser_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid;
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = Number(details.requestId);
        const url = details.url;
        update.url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeUrl)(url);
        const requestMethod = details.method;
        update.method = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(requestMethod);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        let encodingType = "";
        let referrer = "";
        const headers = [];
        let isOcsp = false;
        if (details.requestHeaders) {
            details.requestHeaders.map((requestHeader) => {
                const { name, value } = requestHeader;
                const header_pair = [];
                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(name));
                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(value));
                headers.push(header_pair);
                if (name === "Content-Type") {
                    encodingType = value;
                    if (encodingType.indexOf("application/ocsp-request") !== -1) {
                        isOcsp = true;
                    }
                }
                if (name === "Referer") {
                    referrer = value;
                }
            });
        }
        update.referrer = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(referrer);
        if (requestMethod === "POST" && !isOcsp /* don't process OCSP requests */) {
            const pendingRequest = this.getPendingRequest(details.requestId);
            const resolved = await pendingRequest.resolvedWithinTimeout(1000);
            if (!resolved) {
                this.dataReceiver.logError("Pending request timed out waiting for data from both onBeforeRequest and onBeforeSendHeaders events");
            }
            else {
                const onBeforeRequestEventDetails = await pendingRequest.onBeforeRequestEventDetails;
                const requestBody = onBeforeRequestEventDetails.requestBody;
                if (requestBody) {
                    const postParser = new _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__.HttpPostParser(onBeforeRequestEventDetails, this.dataReceiver);
                    const postObj = postParser.parsePostRequest();
                    // Add (POST) request headers from upload stream
                    if ("post_headers" in postObj) {
                        // Only store POST headers that we know and need. We may misinterpret POST data as headers
                        // as detection is based on "key:value" format (non-header POST data can be in this format as well)
                        const contentHeaders = [
                            "Content-Type",
                            "Content-Disposition",
                            "Content-Length",
                        ];
                        for (const name in postObj.post_headers) {
                            if (contentHeaders.includes(name)) {
                                const header_pair = [];
                                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(name));
                                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(postObj.post_headers[name]));
                                headers.push(header_pair);
                            }
                        }
                    }
                    // we store POST body in JSON format, except when it's a string without a (key-value) structure
                    if ("post_body" in postObj) {
                        update.post_body = postObj.post_body;
                    }
                    if ("post_body_raw" in postObj) {
                        update.post_body_raw = postObj.post_body_raw;
                    }
                }
            }
        }
        update.headers = JSON.stringify(headers);
        // Check if xhr
        const isXHR = details.type === "xmlhttprequest";
        update.is_XHR = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.boolToInt)(isXHR);
        // Grab the triggering and loading Principals
        let triggeringOrigin;
        let loadingOrigin;
        if (details.originUrl) {
            const parsedOriginUrl = new URL(details.originUrl);
            triggeringOrigin = parsedOriginUrl.origin;
        }
        if (details.documentUrl) {
            const parsedDocumentUrl = new URL(details.documentUrl);
            loadingOrigin = parsedDocumentUrl.origin;
        }
        update.triggering_origin = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(triggeringOrigin);
        update.loading_origin = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(loadingOrigin);
        // loadingDocument's href
        // The loadingDocument is the document the element resides, regardless of
        // how the load was triggered.
        const loadingHref = details.documentUrl;
        update.loading_href = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(loadingHref);
        // resourceType of the requesting node. This is set by the type of
        // node making the request (i.e. an <img src=...> node will set to type "image").
        // Documentation:
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
        update.resource_type = details.type;
        /*
        // TODO: Refactor to corresponding webext logic or discard
        const ThirdPartyUtil = Cc["@mozilla.org/thirdpartyutil;1"].getService(
                               Ci.mozIThirdPartyUtil);
        // Do third-party checks
        // These specific checks are done because it's what's used in Tracking Protection
        // See: http://searchfox.org/mozilla-central/source/netwerk/base/nsChannelClassifier.cpp#107
        try {
          const isThirdPartyChannel = ThirdPartyUtil.isThirdPartyChannel(details);
          const topWindow = ThirdPartyUtil.getTopWindowForChannel(details);
          const topURI = ThirdPartyUtil.getURIFromWindow(topWindow);
          if (topURI) {
            const topUrl = topURI.spec;
            const channelURI = details.URI;
            const isThirdPartyToTopWindow = ThirdPartyUtil.isThirdPartyURI(
              channelURI,
              topURI,
            );
            update.is_third_party_to_top_window = isThirdPartyToTopWindow;
            update.is_third_party_channel = isThirdPartyChannel;
          }
        } catch (anError) {
          // Exceptions expected for channels triggered or loading in a
          // NullPrincipal or SystemPrincipal. They are also expected for favicon
          // loads, which we attempt to filter. Depending on the naming, some favicons
          // may continue to lead to error logs.
          if (
            update.triggering_origin !== "[System Principal]" &&
            update.triggering_origin !== undefined &&
            update.loading_origin !== "[System Principal]" &&
            update.loading_origin !== undefined &&
            !update.url.endsWith("ico")
          ) {
            this.dataReceiver.logError(
              "Error while retrieving additional channel information for URL: " +
              "\n" +
              update.url +
              "\n Error text:" +
              JSON.stringify(anError),
            );
          }
        }
        */
        update.top_level_url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeUrl)(this.getDocumentUrlForRequest(details));
        update.parent_frame_id = details.parentFrameId;
        update.frame_ancestors = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(JSON.stringify(details.frameAncestors));
        this.dataReceiver.saveRecord("http_requests", update);
    }
    /**
     * Code taken and adapted from
     * https://github.com/EFForg/privacybadger/pull/2198/files
     *
     * Gets the URL for a given request's top-level document.
     *
     * The request's document may be different from the current top-level document
     * loaded in tab as requests can come out of order:
     *
     * @param {WebRequestOnBeforeSendHeadersEventDetails} details
     *
     * @return {?String} the URL for the request's top-level document
     */
    getDocumentUrlForRequest(details) {
        let url = "";
        if (details.type === "main_frame") {
            // Url of the top-level document itself.
            url = details.url;
        }
        else if (details.hasOwnProperty("frameAncestors")) {
            // In case of nested frames, retrieve url from top-most ancestor.
            // If frameAncestors == [], request comes from the top-level-document.
            url = details.frameAncestors.length
                ? details.frameAncestors[details.frameAncestors.length - 1].url
                : details.documentUrl;
        }
        else {
            // type != 'main_frame' and frameAncestors == undefined
            // For example service workers: https://bugzilla.mozilla.org/show_bug.cgi?id=1470537#c13
            url = details.documentUrl;
        }
        return url;
    }
    async onBeforeRedirectHandler(details, crawlID, eventOrdinal) {
        /*
        console.log(
          "onBeforeRedirectHandler (previously httpRequestHandler)",
          details,
          crawlID,
        );
        */
        // Save HTTP redirect events
        // Events are saved to the `http_redirects` table
        /*
        // TODO: Refactor to corresponding webext logic or discard
        // Events are saved to the `http_redirects` table, and map the old
        // request/response channel id to the new request/response channel id.
        // Implementation based on: https://stackoverflow.com/a/11240627
        const oldNotifications = details.notificationCallbacks;
        let oldEventSink = null;
        details.notificationCallbacks = {
          QueryInterface: XPCOMUtils.generateQI([
            Ci.nsIInterfaceRequestor,
            Ci.nsIChannelEventSink,
          ]),
    
          getInterface(iid) {
            // We are only interested in nsIChannelEventSink,
            // return the old callbacks for any other interface requests.
            if (iid.equals(Ci.nsIChannelEventSink)) {
              try {
                oldEventSink = oldNotifications.QueryInterface(iid);
              } catch (anError) {
                this.dataReceiver.logError(
                  "Error during call to custom notificationCallbacks::getInterface." +
                    JSON.stringify(anError),
                );
              }
              return this;
            }
    
            if (oldNotifications) {
              return oldNotifications.getInterface(iid);
            } else {
              throw Cr.NS_ERROR_NO_INTERFACE;
            }
          },
    
          asyncOnChannelRedirect(oldChannel, newChannel, flags, callback) {
    
            newChannel.QueryInterface(Ci.nsIHttpChannel);
    
            const httpRedirect: HttpRedirect = {
              browser_id: crawlID,
              old_request_id: oldChannel.channelId,
              new_request_id: newChannel.channelId,
              time_stamp: new Date().toISOString(),
            };
            this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    
            if (oldEventSink) {
              oldEventSink.asyncOnChannelRedirect(
                oldChannel,
                newChannel,
                flags,
                callback,
              );
            } else {
              callback.onRedirectVerifyCallback(Cr.NS_OK);
            }
          },
        };
        */
        const responseStatus = details.statusCode;
        const responseStatusText = details.statusLine;
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const httpRedirect = {
            incognito: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.boolToInt)(tab.incognito),
            browser_id: crawlID,
            old_request_url: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeUrl)(details.url),
            old_request_id: details.requestId,
            new_request_url: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeUrl)(details.redirectUrl),
            new_request_id: null,
            extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid,
            event_ordinal: eventOrdinal,
            window_id: tab.windowId,
            tab_id: details.tabId,
            frame_id: details.frameId,
            response_status: responseStatus,
            response_status_text: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(responseStatusText),
            headers: this.jsonifyHeaders(details.responseHeaders).headers,
            time_stamp: new Date(details.timeStamp).toISOString(),
        };
        this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    }
    /*
     * HTTP Response Handlers and Helper Functions
     */
    async logWithResponseBody(details, update) {
        const pendingResponse = this.getPendingResponse(details.requestId);
        try {
            const responseBodyListener = pendingResponse.responseBodyListener;
            const respBody = await responseBodyListener.getResponseBody();
            const contentHash = await responseBodyListener.getContentHash();
            this.dataReceiver.saveContent(respBody, (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(contentHash));
            update.content_hash = contentHash;
            this.dataReceiver.saveRecord("http_responses", update);
        }
        catch (err) {
            /*
            // TODO: Refactor to corresponding webext logic or discard
            dataReceiver.logError(
              "Unable to retrieve response body." + JSON.stringify(aReason),
            );
            update.content_hash = "<error>";
            dataReceiver.saveRecord("http_responses", update);
            */
            this.dataReceiver.logError("Unable to retrieve response body." +
                "Likely caused by a programming error. Error Message:" +
                err.name +
                err.message +
                "\n" +
                err.stack);
            update.content_hash = "<error>";
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
    // Instrument HTTP responses
    async onCompletedHandler(details, crawlID, eventOrdinal, saveContent) {
        /*
        console.log(
          "onCompletedHandler (previously httpRequestHandler)",
          details,
          crawlID,
          saveContent,
        );
        */
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const update = {};
        update.incognito = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.boolToInt)(tab.incognito);
        update.browser_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid;
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = Number(details.requestId);
        const isCached = details.fromCache;
        update.is_cached = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.boolToInt)(isCached);
        const url = details.url;
        update.url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeUrl)(url);
        const requestMethod = details.method;
        update.method = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(requestMethod);
        // TODO: Refactor to corresponding webext logic or discard
        // (request headers are not available in http response event listener object,
        // but the referrer property of the corresponding request could be queried)
        //
        // let referrer = "";
        // if (details.referrer) {
        //   referrer = details.referrer.spec;
        // }
        // update.referrer = escapeString(referrer);
        const responseStatus = details.statusCode;
        update.response_status = responseStatus;
        const responseStatusText = details.statusLine;
        update.response_status_text = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(responseStatusText);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        const parsedHeaders = this.jsonifyHeaders(details.responseHeaders);
        update.headers = parsedHeaders.headers;
        update.location = parsedHeaders.location;
        if (this.shouldSaveContent(saveContent, details.type)) {
            this.logWithResponseBody(details, update);
        }
        else {
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
    jsonifyHeaders(headers) {
        const resultHeaders = [];
        let location = "";
        if (headers) {
            headers.map((responseHeader) => {
                const { name, value } = responseHeader;
                const header_pair = [];
                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(name));
                header_pair.push((0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(value));
                resultHeaders.push(header_pair);
                if (name.toLowerCase() === "location") {
                    location = value;
                }
            });
        }
        return {
            headers: JSON.stringify(resultHeaders),
            location: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__.escapeString)(location),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQXFCLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWV6RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLFFBQVEsR0FBbUI7SUFDL0IsUUFBUTtJQUNSLFlBQVk7SUFDWixNQUFNO0lBQ04sT0FBTztJQUNQLFVBQVU7SUFDVixZQUFZO0lBQ1osT0FBTztJQUNQLFFBQVE7SUFDUixtQkFBbUI7SUFDbkIsTUFBTTtJQUNOLFFBQVE7SUFDUixhQUFhO0lBQ2IsWUFBWTtJQUNaLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztJQUNYLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsTUFBTTtJQUNOLE9BQU87Q0FDUixDQUFDO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBRXBCLE1BQU0sT0FBTyxjQUFjO0lBQ1IsWUFBWSxDQUFDO0lBQ3RCLGVBQWUsR0FFbkIsRUFBRSxDQUFDO0lBQ0MsZ0JBQWdCLEdBRXBCLEVBQUUsQ0FBQztJQUNDLHVCQUF1QixDQUFDO0lBQ3hCLDJCQUEyQixDQUFDO0lBQzVCLHdCQUF3QixDQUFDO0lBQ3pCLG1CQUFtQixDQUFDO0lBRTVCLFlBQVksWUFBWTtRQUN0QixJQUFJLENBQUMsWUFB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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/javascript-instrument.js":
/*!**********************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/javascript-instrument.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavascriptInstrument": () => (/* binding */ JavascriptInstrument)
/* harmony export */ });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");



class JavascriptInstrument {
    /**
     * Converts received call and values data from the JS Instrumentation
     * into the format that the schema expects.
     *
     * @param data
     * @param sender
     */
    static processCallsAndValues(data, sender) {
        const update = {};
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid;
        update.event_ordinal = (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)();
        update.page_scoped_event_ordinal = data.ordinal;
        update.window_id = sender.tab.windowId;
        update.tab_id = sender.tab.id;
        update.frame_id = sender.frameId;
        update.script_url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeUrl)(data.scriptUrl);
        update.script_line = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.scriptLine);
        update.script_col = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.scriptCol);
        update.func_name = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.funcName);
        update.script_loc_eval = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.scriptLocEval);
        update.call_stack = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.callStack);
        update.symbol = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.symbol);
        update.operation = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.operation);
        update.value = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(data.value);
        update.time_stamp = data.timeStamp;
        update.incognito = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.boolToInt)(sender.tab.incognito);
        // document_url is the current frame's document href
        // top_level_url is the top-level frame's document href
        update.document_url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeUrl)(sender.url);
        update.top_level_url = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeUrl)(sender.tab.url);
        if (data.operation === "call" && data.args.length > 0) {
            update.arguments = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__.escapeString)(JSON.stringify(data.args));
        }
        return update;
    }
    dataReceiver;
    onMessageListener;
    configured = false;
    pendingRecords = [];
    crawlID;
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    /**
     * Start listening for messages from page/content/background scripts injected to instrument JavaScript APIs
     */
    listen() {
        this.onMessageListener = (message, sender) => {
            if (message.namespace &&
                message.namespace === "javascript-instrumentation") {
                this.handleJsInstrumentationMessage(message, sender);
            }
        };
        browser.runtime.onMessage.addListener(this.onMessageListener);
    }
    /**
     * Either sends the log data to the dataReceiver or store it in memory
     * as a pending record if the JS instrumentation is not yet configured
     *
     * @param message
     * @param sender
     */
    handleJsInstrumentationMessage(message, sender) {
        switch (message.type) {
            case "logCall":
            case "logValue":
                const update = JavascriptInstrument.processCallsAndValues(message.data, sender);
                if (this.configured) {
                    update.browser_id = this.crawlID;
                    this.dataReceiver.saveRecord("javascript", update);
                }
                else {
                    this.pendingRecords.push(update);
                }
                break;
        }
    }
    /**
     * Starts listening if haven't done so already, sets the crawl ID,
     * marks the JS instrumentation as configured and sends any pending
     * records that have been received up until this point.
     *
     * @param crawlID
     */
    run(crawlID) {
        if (!this.onMessageListener) {
            this.listen();
        }
        this.crawlID = crawlID;
        this.configured = true;
        this.pendingRecords.map((update) => {
            update.browser_id = this.crawlID;
            this.dataReceiver.saveRecord("javascript", update);
        });
    }
    async registerContentScript(testing, jsInstrumentationSettings) {
        const contentScriptConfig = {
            testing,
            jsInstrumentationSettings,
        };
        if (contentScriptConfig) {
            // TODO: Avoid using window to pass the content script config
            await browser.contentScripts.register({
                js: [
                    {
                        code: `window.openWpmContentScriptConfig = ${JSON.stringify(contentScriptConfig)};`,
                    },
                ],
                matches: ["<all_urls>"],
                allFrames: true,
                runAt: "document_start",
                matchAboutBlank: true,
            });
        }
        return browser.contentScripts.register({
            js: [{ file: "/content.js" }],
            matches: ["<all_urls>"],
            allFrames: true,
            runAt: "document_start",
            matchAboutBlank: true,
        });
    }
    cleanup() {
        this.pendingRecords = [];
        if (this.onMessageListener) {
            browser.runtime.onMessage.removeListener(this.onMessageListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXpFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7OztPQU1HO0lBQ0ssTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxNQUFxQjtRQUM5RCxNQUFNLE1BQU0sR0FBRyxFQUF5QixDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNyRCxNQUFNLENBQUMsYUFBYSxHQUFHLHVCQUF1QixFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxNQUFNLENB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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/navigation-instrument.js":
/*!**********************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/navigation-instrument.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformWebNavigationBaseEventDetailsToOpenWPMSchema": () => (/* binding */ transformWebNavigationBaseEventDetailsToOpenWPMSchema),
/* harmony export */   "NavigationInstrument": () => (/* binding */ NavigationInstrument)
/* harmony export */ });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/pending-navigation */ "../webext-instrumentation/build/module/lib/pending-navigation.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");
/* harmony import */ var _lib_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/uuid */ "../webext-instrumentation/build/module/lib/uuid.js");





const transformWebNavigationBaseEventDetailsToOpenWPMSchema = async (crawlID, details) => {
    const tab = details.tabId > -1
        ? await browser.tabs.get(details.tabId)
        : {
            windowId: undefined,
            incognito: undefined,
            cookieStoreId: undefined,
            openerTabId: undefined,
            width: undefined,
            height: undefined,
        };
    const window = tab.windowId
        ? await browser.windows.get(tab.windowId)
        : { width: undefined, height: undefined, type: undefined };
    const navigation = {
        browser_id: crawlID,
        incognito: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__.boolToInt)(tab.incognito),
        extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__.extensionSessionUuid,
        process_id: details.processId,
        window_id: tab.windowId,
        tab_id: details.tabId,
        tab_opener_tab_id: tab.openerTabId,
        frame_id: details.frameId,
        window_width: window.width,
        window_height: window.height,
        window_type: window.type,
        tab_width: tab.width,
        tab_height: tab.height,
        tab_cookie_store_id: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__.escapeString)(tab.cookieStoreId),
        uuid: (0,_lib_uuid__WEBPACK_IMPORTED_MODULE_4__.makeUUID)(),
        url: (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__.escapeUrl)(details.url),
    };
    return navigation;
};
class NavigationInstrument {
    static navigationId(processId, tabId, frameId) {
        return `${processId}-${tabId}-${frameId}`;
    }
    dataReceiver;
    onBeforeNavigateListener;
    onCommittedListener;
    pendingNavigations = {};
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        this.onBeforeNavigateListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const pendingNavigation = this.instantiatePendingNavigation(navigationId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.parent_frame_id = details.parentFrameId;
            navigation.before_navigate_event_ordinal = (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)();
            navigation.before_navigate_time_stamp = new Date(details.timeStamp).toISOString();
            pendingNavigation.resolveOnBeforeNavigateEventNavigation(navigation);
        };
        browser.webNavigation.onBeforeNavigate.addListener(this.onBeforeNavigateListener);
        this.onCommittedListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.transition_qualifiers = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__.escapeString)(JSON.stringify(details.transitionQualifiers));
            navigation.transition_type = (0,_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__.escapeString)(details.transitionType);
            navigation.committed_event_ordinal = (0,_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__.incrementedEventOrdinal)();
            navigation.committed_time_stamp = new Date(details.timeStamp).toISOString();
            // include attributes from the corresponding onBeforeNavigation event
            const pendingNavigation = this.getPendingNavigation(navigationId);
            if (pendingNavigation) {
                pendingNavigation.resolveOnCommittedEventNavigation(navigation);
                const resolved = await pendingNavigation.resolvedWithinTimeout(1000);
                if (resolved) {
                    const onBeforeNavigateEventNavigation = await pendingNavigation.onBeforeNavigateEventNavigation;
                    navigation.parent_frame_id =
                        onBeforeNavigateEventNavigation.parent_frame_id;
                    navigation.before_navigate_event_ordinal =
                        onBeforeNavigateEventNavigation.before_navigate_event_ordinal;
                    navigation.before_navigate_time_stamp =
                        onBeforeNavigateEventNavigation.before_navigate_time_stamp;
                }
            }
            this.dataReceiver.saveRecord("navigations", navigation);
        };
        browser.webNavigation.onCommitted.addListener(this.onCommittedListener);
    }
    cleanup() {
        if (this.onBeforeNavigateListener) {
            browser.webNavigation.onBeforeNavigate.removeListener(this.onBeforeNavigateListener);
        }
        if (this.onCommittedListener) {
            browser.webNavigation.onCommitted.removeListener(this.onCommittedListener);
        }
    }
    instantiatePendingNavigation(navigationId) {
        this.pendingNavigations[navigationId] = new _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__.PendingNavigation();
        return this.pendingNavigations[navigationId];
    }
    getPendingNavigation(navigationId) {
        return this.pendingNavigations[navigationId];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFRdkMsTUFBTSxDQUFDLE1BQU0scURBQXFELEdBQUcsS0FBSyxFQUN4RSxPQUFPLEVBQ1AsT0FBc0MsRUFDakIsRUFBRTtJQUN2QixNQUFNLEdBQUcsR0FDUCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztZQUNFLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7SUFDUixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUTtRQUN6QixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJ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

/***/ }),

/***/ "../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js":
/*!*********************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "injectJavascriptInstrumentPageScript": () => (/* binding */ injectJavascriptInstrumentPageScript)
/* harmony export */ });
/* harmony import */ var _lib_js_instruments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/js-instruments */ "../webext-instrumentation/build/module/lib/js-instruments.js");
/* harmony import */ var _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./javascript-instrument-page-scope */ "../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js");


function getPageScriptAsString(jsInstrumentationSettings) {
    // The JS Instrument Requests are setup and validated python side
    // including setting defaults for logSettings. See JSInstrumentation.py
    const pageScriptString = `
// Start of js-instruments.
${_lib_js_instruments__WEBPACK_IMPORTED_MODULE_0__.getInstrumentJS}
// End of js-instruments.

// Start of custom instrumentRequests.
const jsInstrumentationSettings = ${JSON.stringify(jsInstrumentationSettings)};
// End of custom instrumentRequests.

// Start of anonymous function from javascript-instrument-page-scope.ts
(${_javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_1__.pageScript}(getInstrumentJS, jsInstrumentationSettings));
// End.
  `;
    return pageScriptString;
}
;
function insertScript(pageScriptString, eventId, testing = false) {
    const parent = document.documentElement;
    const script = document.createElement("script");
    script.text = pageScriptString;
    script.async = false;
    script.setAttribute("data-event-id", eventId);
    script.setAttribute("data-testing", `${testing}`);
    parent.insertBefore(script, parent.firstChild);
    parent.removeChild(script);
}
;
function emitMsg(type, msg) {
    msg.timeStamp = new Date().toISOString();
    browser.runtime.sendMessage({
        namespace: "javascript-instrumentation",
        type,
        data: msg,
    });
}
;
const eventId = Math.random().toString();
// listen for messages from the script we are about to insert
document.addEventListener(eventId, (e) => {
    // pass these on to the background page
    const msgs = e.detail;
    if (Array.isArray(msgs)) {
        msgs.forEach((msg) => {
            emitMsg(msg.type, msg.content);
        });
    }
    else {
        emitMsg(msgs.type, msgs.content);
    }
});
const injectJavascriptInstrumentPageScript = (contentScriptConfig) => {
    insertScript(getPageScriptAsString(contentScriptConfig.jsInstrumentationSettings), eventId, contentScriptConfig.testing);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUF1QixNQUFNLHVCQUF1QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUdoRSxTQUFTLHFCQUFxQixDQUM1Qix5QkFBZ0Q7SUFFaEQsaUVBQWlFO0lBQ2pFLHVFQUF1RTtJQUN2RSxNQUFNLGdCQUFnQixHQUFHOztFQUV6QixlQUFlOzs7O29DQUltQixJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDOzs7O0dBSTFFLFVBQVU7O0dBRVYsQ0FBQztJQUNGLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQUFBLENBQUM7QUFFRixTQUFTLFlBQVksQ0FDbkIsZ0JBQXdCLEVBQ3hCLE9BQWUsRUFDZixVQUFtQixLQUFLO0lBRXhCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDeEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0lBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQUEsQ0FBQztBQUVGLFNBQVMsT0FBTyxDQUFFLElBQUksRUFBRSxHQUFHO0lBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUMxQixTQUFTLEVBQUUsNEJBQTRCO1FBQ3ZDLElBQUk7UUFDSixJQUFJLEVBQUUsR0FBRztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUM7QUFBQSxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRXpDLDZEQUE2RDtBQUM3RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYyxFQUFFLEVBQUU7SUFDcEQsdUNBQXVDO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDdEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxvQ0FBb0MsR0FBRyxDQUFDLG1CQUErQyxFQUFFLEVBQUU7SUFDdEcsWUFBWSxDQUNWLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEVBQ3BFLE9BQU8sRUFDUCxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLENBQUM7QUFDSixDQUFDLENBQUEifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js":
/*!******************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageScript": () => (/* binding */ pageScript)
/* harmony export */ });
/* eslint-disable no-console */
// Code below is not a content script: no Firefox APIs should be used
// Also, no webpack/es6 imports may be used in this file since the script
// is exported as a page script as a string
function pageScript(getInstrumentJS, jsInstrumentationSettings) {
    // messages the injected script
    const sendMessagesToLogger = (eventId, messages) => {
        document.dispatchEvent(new CustomEvent(eventId, {
            detail: messages,
        }));
    };
    const eventId = document.currentScript.getAttribute("data-event-id");
    const testing = document.currentScript.getAttribute("data-testing");
    const instrumentJS = getInstrumentJS(eventId, sendMessagesToLogger);
    let t0;
    if (testing === "true") {
        console.log("OpenWPM: Currently testing");
        t0 = performance.now();
        console.log("Begin loading JS instrumentation.");
    }
    instrumentJS(jsInstrumentationSettings);
    if (testing === "true") {
        const t1 = performance.now();
        console.log(`Call to instrumentJS took ${t1 - t0} milliseconds.`);
        window.instrumentJS = instrumentJS;
        console.log("OpenWPM: Content-side javascript instrumentation started with spec:", jsInstrumentationSettings, new Date().toISOString(), "(if spec is '<unavailable>' check web console.)");
    }
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0IscUVBQXFFO0FBQ3JFLHlFQUF5RTtBQUN6RSwyQ0FBMkM7QUFFM0MsTUFBTSxVQUFVLFVBQVUsQ0FBRSxlQUFlLEVBQUUseUJBQXlCO0lBQ3BFLCtCQUErQjtJQUMvQixNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ2pELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN2QixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNwRSxJQUFJLEVBQVUsQ0FBQztJQUNmLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN4QyxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7UUFDdEIsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakUsTUFBYyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxxRUFBcUUsRUFDckUseUJBQXlCLEVBQ3pCLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQ3hCLGlEQUFpRCxDQUNsRCxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBQUEsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/index.js":
/*!*******************************************************!*\
  !*** ../webext-instrumentation/build/module/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CookieInstrument": () => (/* reexport safe */ _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__.CookieInstrument),
/* harmony export */   "transformCookieObjectToMatchOpenWPMSchema": () => (/* reexport safe */ _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__.transformCookieObjectToMatchOpenWPMSchema),
/* harmony export */   "DnsInstrument": () => (/* reexport safe */ _background_dns_instrument__WEBPACK_IMPORTED_MODULE_1__.DnsInstrument),
/* harmony export */   "HttpInstrument": () => (/* reexport safe */ _background_http_instrument__WEBPACK_IMPORTED_MODULE_2__.HttpInstrument),
/* harmony export */   "allTypes": () => (/* reexport safe */ _background_http_instrument__WEBPACK_IMPORTED_MODULE_2__.allTypes),
/* harmony export */   "JavascriptInstrument": () => (/* reexport safe */ _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_3__.JavascriptInstrument),
/* harmony export */   "NavigationInstrument": () => (/* reexport safe */ _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_4__.NavigationInstrument),
/* harmony export */   "transformWebNavigationBaseEventDetailsToOpenWPMSchema": () => (/* reexport safe */ _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_4__.transformWebNavigationBaseEventDetailsToOpenWPMSchema),
/* harmony export */   "injectJavascriptInstrumentPageScript": () => (/* reexport safe */ _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_5__.injectJavascriptInstrumentPageScript),
/* harmony export */   "HttpPostParser": () => (/* reexport safe */ _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_6__.HttpPostParser),
/* harmony export */   "Uint8ToBase64": () => (/* reexport safe */ _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__.Uint8ToBase64),
/* harmony export */   "boolToInt": () => (/* reexport safe */ _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__.boolToInt),
/* harmony export */   "encode_utf8": () => (/* reexport safe */ _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__.encode_utf8),
/* harmony export */   "escapeString": () => (/* reexport safe */ _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__.escapeString),
/* harmony export */   "escapeUrl": () => (/* reexport safe */ _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__.escapeUrl),
/* harmony export */   "dateTimeUnicodeFormatString": () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_8__.dateTimeUnicodeFormatString)
/* harmony export */ });
/* harmony import */ var _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/cookie-instrument */ "../webext-instrumentation/build/module/background/cookie-instrument.js");
/* harmony import */ var _background_dns_instrument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/dns-instrument */ "../webext-instrumentation/build/module/background/dns-instrument.js");
/* harmony import */ var _background_http_instrument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background/http-instrument */ "../webext-instrumentation/build/module/background/http-instrument.js");
/* harmony import */ var _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background/javascript-instrument */ "../webext-instrumentation/build/module/background/javascript-instrument.js");
/* harmony import */ var _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./background/navigation-instrument */ "../webext-instrumentation/build/module/background/navigation-instrument.js");
/* harmony import */ var _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./content/javascript-instrument-content-scope */ "../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js");
/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/http-post-parser */ "../webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./schema */ "../webext-instrumentation/build/module/schema.js");









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsOEJBQThCLENBQUM7QUFDN0MsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxjQUFjLG9DQUFvQyxDQUFDO0FBQ25ELGNBQWMsK0NBQStDLENBQUM7QUFDOUQsY0FBYyx3QkFBd0IsQ0FBQztBQUN2QyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsVUFBVSxDQUFDIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js":
/*!*************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "incrementedEventOrdinal": () => (/* binding */ incrementedEventOrdinal)
/* harmony export */ });
/**
 * This enables us to keep information about the original order
 * in which events arrived to our event listeners.
 */
let eventOrdinal = 0;
const incrementedEventOrdinal = () => {
    return eventOrdinal++;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBQzFDLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/extension-session-uuid.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/extension-session-uuid.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extensionSessionUuid": () => (/* binding */ extensionSessionUuid)
/* harmony export */ });
/* harmony import */ var _uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid */ "../webext-instrumentation/build/module/lib/uuid.js");

/**
 * This enables us to access a unique reference to this browser
 * session - regenerated any time the background process gets
 * restarted (which should only be on browser restarts)
 */
const extensionSessionUuid = (0,_uuid__WEBPACK_IMPORTED_MODULE_0__.makeUUID)();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLEVBQUUsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/http-post-parser.js":
/*!**********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/http-post-parser.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpPostParser": () => (/* binding */ HttpPostParser)
/* harmony export */ });
/* harmony import */ var _string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");

class HttpPostParser {
    onBeforeRequestEventDetails;
    dataReceiver;
    constructor(onBeforeRequestEventDetails, dataReceiver) {
        this.onBeforeRequestEventDetails = onBeforeRequestEventDetails;
        this.dataReceiver = dataReceiver;
    }
    parsePostRequest() {
        const requestBody = this.onBeforeRequestEventDetails.requestBody;
        if (requestBody.error) {
            this.dataReceiver.logError("Exception: Upstream failed to parse POST: " + requestBody.error);
        }
        if (requestBody.formData) {
            return {
                post_body: (0,_string_utils__WEBPACK_IMPORTED_MODULE_0__.escapeString)(JSON.stringify(requestBody.formData)),
            };
        }
        if (requestBody.raw) {
            return {
                post_body_raw: JSON.stringify(requestBody.raw.map((x) => [
                    x.file,
                    (0,_string_utils__WEBPACK_IMPORTED_MODULE_0__.Uint8ToBase64)(new Uint8Array(x.bytes)),
                ])),
            };
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wb3N0LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaHR0cC1wb3N0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUTdELE1BQU0sT0FBTyxjQUFjO0lBQ1IsMkJBQTJCLENBQXdDO0lBQ25FLFlBQVksQ0FBQztJQUU5QixZQUNFLDJCQUFrRSxFQUNsRSxZQUFZO1FBRVosSUFBSSxDQUFDLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDO1FBQy9ELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsQ0FBQztRQUNqRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQ3hCLDRDQUE0QyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQ2pFLENBQUM7U0FDSDtRQUNELElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN4QixPQUFPO2dCQUNMLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUQsQ0FBQztTQUNIO1FBQ0QsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ25CLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQzNCLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLElBQUk7b0JBQ04sYUFBYSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkMsQ0FBQyxDQUNIO2FBQ0YsQ0FBQztTQUNIO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/js-instruments.js":
/*!********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/js-instruments.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getInstrumentJS": () => (/* binding */ getInstrumentJS)
/* harmony export */ });
// Intrumentation injection code is based on privacybadgerfirefox
// https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js
function getInstrumentJS(eventId, sendMessagesToLogger) {
    /*
     * Instrumentation helpers
     * (Inlined in order for jsInstruments to be easily exportable as a string)
     */
    // Counter to cap # of calls logged for each script/api combination
    const maxLogCount = 500;
    // logCounter
    const logCounter = new Object();
    // Prevent logging of gets arising from logging
    let inLog = false;
    // To keep track of the original order of events
    let ordinal = 0;
    // Options for JSOperation
    const JSOperation = {
        call: "call",
        get: "get",
        get_failed: "get(failed)",
        get_function: "get(function)",
        set: "set",
        set_failed: "set(failed)",
        set_prevented: "set(prevented)",
    };
    // Rough implementations of Object.getPropertyDescriptor and Object.getPropertyNames
    // See http://wiki.ecmascript.org/doku.php?id=harmony:extended_object_api
    Object.getPropertyDescriptor = function (subject, name) {
        if (subject === undefined) {
            throw new Error("Can't get property descriptor for undefined");
        }
        let pd = Object.getOwnPropertyDescriptor(subject, name);
        let proto = Object.getPrototypeOf(subject);
        while (pd === undefined && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return pd;
    };
    Object.getPropertyNames = function (subject) {
        if (subject === undefined) {
            throw new Error("Can't get property names for undefined");
        }
        let props = Object.getOwnPropertyNames(subject);
        let proto = Object.getPrototypeOf(subject);
        while (proto !== null) {
            props = props.concat(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        }
        // FIXME: remove duplicate property names from props
        return props;
    };
    // debounce - from Underscore v1.6.0
    function debounce(func, wait, immediate = false) {
        let timeout;
        let args;
        let context;
        let timestamp;
        let result;
        const later = function () {
            const last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            const callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    // Recursively generates a path for an element
    function getPathToDomElement(element, visibilityAttr = false) {
        if (element === document.body) {
            return element.tagName;
        }
        if (element.parentNode === null) {
            return "NULL/" + element.tagName;
        }
        let siblingIndex = 1;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                let path = getPathToDomElement(element.parentNode, visibilityAttr);
                path += "/" + element.tagName + "[" + siblingIndex;
                path += "," + element.id;
                path += "," + element.className;
                if (visibilityAttr) {
                    path += "," + element.hidden;
                    path += "," + element.style.display;
                    path += "," + element.style.visibility;
                }
                if (element.tagName === "A") {
                    path += "," + element.href;
                }
                path += "]";
                return path;
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                siblingIndex++;
            }
        }
    }
    // Helper for JSONifying objects
    function serializeObject(object, stringifyFunctions = false) {
        // Handle permissions errors
        try {
            if (object === null) {
                return "null";
            }
            if (typeof object === "function") {
                return stringifyFunctions ? object.toString() : "FUNCTION";
            }
            if (typeof object !== "object") {
                return object;
            }
            const seenObjects = [];
            return JSON.stringify(object, function (key, value) {
                if (value === null) {
                    return "null";
                }
                if (typeof value === "function") {
                    return stringifyFunctions ? value.toString() : "FUNCTION";
                }
                if (typeof value === "object") {
                    // Remove wrapping on content objects
                    if ("wrappedJSObject" in value) {
                        value = value.wrappedJSObject;
                    }
                    // Serialize DOM elements
                    if (value instanceof HTMLElement) {
                        return getPathToDomElement(value);
                    }
                    // Prevent serialization cycles
                    if (key === "" || seenObjects.indexOf(value) < 0) {
                        seenObjects.push(value);
                        return value;
                    }
                    else {
                        return typeof value;
                    }
                }
                return value;
            });
        }
        catch (error) {
            console.log("OpenWPM: SERIALIZATION ERROR: " + error);
            return "SERIALIZATION ERROR: " + error;
        }
    }
    function updateCounterAndCheckIfOver(scriptUrl, symbol) {
        const key = scriptUrl + "|" + symbol;
        if (key in logCounter && logCounter[key] >= maxLogCount) {
            return true;
        }
        else if (!(key in logCounter)) {
            logCounter[key] = 1;
        }
        else {
            logCounter[key] += 1;
        }
        return false;
    }
    // For gets, sets, etc. on a single value
    function logValue(instrumentedVariableName, value, operation, // from JSOperation object please
    callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedVariableName);
        if (overLimit) {
            inLog = false;
            return;
        }
        const msg = {
            operation,
            symbol: instrumentedVariableName,
            value: serializeObject(value, logSettings.logFunctionsAsStrings),
            scriptUrl: callContext.scriptUrl,
            scriptLine: callContext.scriptLine,
            scriptCol: callContext.scriptCol,
            funcName: callContext.funcName,
            scriptLocEval: callContext.scriptLocEval,
            callStack: callContext.callStack,
            ordinal: ordinal++,
        };
        try {
            send("logValue", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful value log!");
            logErrorToConsole(error);
        }
        inLog = false;
    }
    // For functions
    function logCall(instrumentedFunctionName, args, callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedFunctionName);
        if (overLimit) {
            inLog = false;
            return;
        }
        try {
            // Convert special arguments array to a standard array for JSONifying
            const serialArgs = [];
            for (const arg of args) {
                serialArgs.push(serializeObject(arg, logSettings.logFunctionsAsStrings));
            }
            const msg = {
                operation: JSOperation.call,
                symbol: instrumentedFunctionName,
                args: serialArgs,
                value: "",
                scriptUrl: callContext.scriptUrl,
                scriptLine: callContext.scriptLine,
                scriptCol: callContext.scriptCol,
                funcName: callContext.funcName,
                scriptLocEval: callContext.scriptLocEval,
                callStack: callContext.callStack,
                ordinal: ordinal++,
            };
            send("logCall", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful call log: " + instrumentedFunctionName);
            logErrorToConsole(error);
        }
        inLog = false;
    }
    function logErrorToConsole(error, context = false) {
        console.error("OpenWPM: Error name: " + error.name);
        console.error("OpenWPM: Error message: " + error.message);
        console.error("OpenWPM: Error filename: " + error.fileName);
        console.error("OpenWPM: Error line number: " + error.lineNumber);
        console.error("OpenWPM: Error stack: " + error.stack);
        if (context) {
            console.error("OpenWPM: Error context: " + JSON.stringify(context));
        }
    }
    // Helper to get originating script urls
    function getStackTrace() {
        let stack;
        try {
            throw new Error();
        }
        catch (err) {
            stack = err.stack;
        }
        return stack;
    }
    // from http://stackoverflow.com/a/5202185
    const rsplit = function (source, sep, maxsplit) {
        const split = source.split(sep);
        return maxsplit
            ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit))
            : split;
    };
    function getOriginatingScriptContext(getCallStack = false) {
        const trace = getStackTrace().trim().split("\n");
        // return a context object even if there is an error
        const empty_context = {
            scriptUrl: "",
            scriptLine: "",
            scriptCol: "",
            funcName: "",
            scriptLocEval: "",
            callStack: "",
        };
        if (trace.length < 4) {
            return empty_context;
        }
        // 0, 1 and 2 are OpenWPM's own functions (e.g. getStackTrace), skip them.
        const callSite = trace[3];
        if (!callSite) {
            return empty_context;
        }
        /*
         * Stack frame format is simply: FUNC_NAME@FILENAME:LINE_NO:COLUMN_NO
         *
         * If eval or Function is involved we have an additional part after the FILENAME, e.g.:
         * FUNC_NAME@FILENAME line 123 > eval line 1 > eval:LINE_NO:COLUMN_NO
         * or FUNC_NAME@FILENAME line 234 > Function:LINE_NO:COLUMN_NO
         *
         * We store the part between the FILENAME and the LINE_NO in scriptLocEval
         */
        try {
            let scriptUrl = "";
            let scriptLocEval = ""; // for eval or Function calls
            const callSiteParts = callSite.split("@");
            const funcName = callSiteParts[0] || "";
            const items = rsplit(callSiteParts[1], ":", 2);
            const columnNo = items[items.length - 1];
            const lineNo = items[items.length - 2];
            const scriptFileName = items[items.length - 3] || "";
            const lineNoIdx = scriptFileName.indexOf(" line "); // line in the URL means eval or Function
            if (lineNoIdx === -1) {
                scriptUrl = scriptFileName; // TODO: sometimes we have filename only, e.g. XX.js
            }
            else {
                scriptUrl = scriptFileName.slice(0, lineNoIdx);
                scriptLocEval = scriptFileName.slice(lineNoIdx + 1, scriptFileName.length);
            }
            const callContext = {
                scriptUrl,
                scriptLine: lineNo,
                scriptCol: columnNo,
                funcName,
                scriptLocEval,
                callStack: getCallStack ? trace.slice(3).join("\n").trim() : "",
            };
            return callContext;
        }
        catch (e) {
            console.log("OpenWPM: Error parsing the script context", e.toString(), callSite);
            return empty_context;
        }
    }
    function isObject(object, propertyName) {
        let property;
        try {
            property = object[propertyName];
        }
        catch (error) {
            return false;
        }
        if (property === null) {
            // null is type "object"
            return false;
        }
        return typeof property === "object";
    }
    // Log calls to a given function
    // This helper function returns a wrapper around `func` which logs calls
    // to `func`. `objectName` and `methodName` are used strictly to identify
    // which object method `func` is coming from in the logs
    function instrumentFunction(objectName, methodName, func, logSettings) {
        return function () {
            const callContext = getOriginatingScriptContext(logSettings.logCallStack);
            logCall(objectName + "." + methodName, arguments, callContext, logSettings);
            return func.apply(this, arguments);
        };
    }
    // Log properties of prototypes and objects
    function instrumentObjectProperty(object, objectName, propertyName, logSettings) {
        if (!object ||
            !objectName ||
            !propertyName ||
            propertyName === "undefined") {
            throw new Error(`Invalid request to instrumentObjectProperty.
        Object: ${object}
        objectName: ${objectName}
        propertyName: ${propertyName}
        `);
        }
        // Store original descriptor in closure
        const propDesc = Object.getPropertyDescriptor(object, propertyName);
        // Property descriptor must exist unless we are instrumenting a nonExisting property
        if (!propDesc &&
            !logSettings.nonExistingPropertiesToInstrument.includes(propertyName)) {
            console.error("Property descriptor not found for", objectName, propertyName, object);
            return;
        }
        // Property descriptor for undefined properties
        let undefinedPropValue;
        const undefinedPropDesc = {
            get: () => {
                return undefinedPropValue;
            },
            set: (value) => {
                undefinedPropValue = value;
            },
            enumerable: false,
        };
        // Instrument data or accessor property descriptors
        const originalGetter = propDesc ? propDesc.get : undefinedPropDesc.get;
        const originalSetter = propDesc ? propDesc.set : undefinedPropDesc.set;
        let originalValue = propDesc ? propDesc.value : undefinedPropValue;
        // We overwrite both data and accessor properties as an instrumented
        // accessor property
        Object.defineProperty(object, propertyName, {
            configurable: true,
            get: (function () {
                return function () {
                    let origProperty;
                    const callContext = getOriginatingScriptContext(logSettings.logCallStack);
                    const instrumentedVariableName = `${objectName}.${propertyName}`;
                    // get original value
                    if (!propDesc) {
                        // if undefined property
                        origProperty = undefinedPropValue;
                    }
                    else if (originalGetter) {
                        // if accessor property
                        origProperty = originalGetter.call(this);
                    }
                    else if ("value" in propDesc) {
                        // if data property
                        origProperty = originalValue;
                    }
                    else {
                        console.error(`Property descriptor for ${instrumentedVariableName} doesn't have getter or value?`);
                        logValue(instrumentedVariableName, "", JSOperation.get_failed, callContext, logSettings);
                        return;
                    }
                    // Log `gets` except those that have instrumented return values
                    // * All returned functions are instrumented with a wrapper
                    // * Returned objects may be instrumented if recursive
                    //   instrumentation is enabled and this isn't at the depth limit.
                    if (typeof origProperty === "function") {
                        if (logSettings.logFunctionGets) {
                            logValue(instrumentedVariableName, origProperty, JSOperation.get_function, callContext, logSettings);
                        }
                        const instrumentedFunctionWrapper = instrumentFunction(objectName, propertyName, origProperty, logSettings);
                        // Restore the original prototype and constructor so that instrumented classes remain intact
                        // TODO: This may have introduced prototype pollution as per https://github.com/mozilla/OpenWPM/issues/471
                        if (origProperty.prototype) {
                            instrumentedFunctionWrapper.prototype = origProperty.prototype;
                            if (origProperty.prototype.constructor) {
                                instrumentedFunctionWrapper.prototype.constructor =
                                    origProperty.prototype.constructor;
                            }
                        }
                        return instrumentedFunctionWrapper;
                    }
                    else if (typeof origProperty === "object" &&
                        logSettings.recursive &&
                        logSettings.depth > 0) {
                        return origProperty;
                    }
                    else {
                        logValue(instrumentedVariableName, origProperty, JSOperation.get, callContext, logSettings);
                        return origProperty;
                    }
                };
            })(),
            set: (function () {
                return function (value) {
                    const callContext = getOriginatingScriptContext(logSettings.logCallStack);
                    const instrumentedVariableName = `${objectName}.${propertyName}`;
                    let returnValue;
                    // Prevent sets for functions and objects if enabled
                    if (logSettings.preventSets &&
                        (typeof originalValue === "function" ||
                            typeof originalValue === "object")) {
                        logValue(instrumentedVariableName, value, JSOperation.set_prevented, callContext, logSettings);
                        return value;
                    }
                    // set new value to original setter/location
                    if (originalSetter) {
                        // if accessor property
                        returnValue = originalSetter.call(this, value);
                    }
                    else if ("value" in propDesc) {
                        inLog = true;
                        if (object.isPrototypeOf(this)) {
                            Object.defineProperty(this, propertyName, {
                                value,
                            });
                        }
                        else {
                            originalValue = value;
                        }
                        returnValue = value;
                        inLog = false;
                    }
                    else {
                        console.error(`Property descriptor for ${instrumentedVariableName} doesn't have setter or value?`);
                        logValue(instrumentedVariableName, value, JSOperation.set_failed, callContext, logSettings);
                        return value;
                    }
                    logValue(instrumentedVariableName, value, JSOperation.set, callContext, logSettings);
                    return returnValue;
                };
            })(),
        });
    }
    function instrumentObject(object, instrumentedName, logSettings) {
        // Set propertiesToInstrument to null to force no properties to be instrumented.
        // (this is used in testing for example)
        let propertiesToInstrument;
        if (logSettings.propertiesToInstrument === null) {
            propertiesToInstrument = [];
        }
        else if (logSettings.propertiesToInstrument.length === 0) {
            propertiesToInstrument = Object.getPropertyNames(object);
        }
        else {
            propertiesToInstrument = logSettings.propertiesToInstrument;
        }
        for (const propertyName of propertiesToInstrument) {
            if (logSettings.excludedProperties.includes(propertyName)) {
                continue;
            }
            // If `recursive` flag set we want to recursively instrument any
            // object properties that aren't the prototype object.
            if (logSettings.recursive &&
                logSettings.depth > 0 &&
                isObject(object, propertyName) &&
                propertyName !== "__proto__") {
                const newInstrumentedName = `${instrumentedName}.${propertyName}`;
                const newLogSettings = { ...logSettings };
                newLogSettings.depth = logSettings.depth - 1;
                newLogSettings.propertiesToInstrument = [];
                instrumentObject(object[propertyName], newInstrumentedName, newLogSettings);
            }
            try {
                instrumentObjectProperty(object, instrumentedName, propertyName, logSettings);
            }
            catch (error) {
                if (error instanceof TypeError &&
                    error.message.includes("can't redefine non-configurable property")) {
                    console.warn(`Cannot instrument non-configurable property: ${instrumentedName}:${propertyName}`);
                }
                else {
                    logErrorToConsole(error, { instrumentedName, propertyName });
                }
            }
        }
        for (const propertyName of logSettings.nonExistingPropertiesToInstrument) {
            if (logSettings.excludedProperties.includes(propertyName)) {
                continue;
            }
            try {
                instrumentObjectProperty(object, instrumentedName, propertyName, logSettings);
            }
            catch (error) {
                logErrorToConsole(error, { instrumentedName, propertyName });
            }
        }
    }
    const sendFactory = function (eventId, $sendMessagesToLogger) {
        let messages = [];
        // debounce sending queued messages
        const _send = debounce(function () {
            $sendMessagesToLogger(eventId, messages);
            // clear the queue
            messages = [];
        }, 100);
        return function (msgType, msg) {
            // queue the message
            messages.push({ type: msgType, content: msg });
            _send();
        };
    };
    const send = sendFactory(eventId, sendMessagesToLogger);
    function instrumentJS(JSInstrumentRequests) {
        // The JS Instrument Requests are setup and validated python side
        // including setting defaults for logSettings.
        // More details about how this function is invoked are in
        // content/javascript-instrument-content-scope.ts
        JSInstrumentRequests.forEach(function (item) {
            instrumentObject(eval(item.object), item.instrumentedName, item.logSettings);
        });
    }
    // This whole function getInstrumentJS returns just the function `instrumentJS`.
    return instrumentJS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtaW5zdHJ1bWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2pzLWluc3RydW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFpRTtBQUNqRSxvRkFBb0Y7QUE4QnBGLE1BQU0sVUFBVSxlQUFlLENBQUMsT0FBZSxFQUFFLG9CQUFvQjtJQUNuRTs7O09BR0c7SUFFSCxtRUFBbUU7SUFDbkUsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLGFBQWE7SUFDYixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLCtDQUErQztJQUMvQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsZ0RBQWdEO0lBQ2hELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVoQiwwQkFBMEI7SUFDMUIsTUFBTSxXQUFXLEdBQUc7UUFDbEIsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsS0FBSztRQUNWLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFlBQVksRUFBRSxlQUFlO1FBQzdCLEdBQUcsRUFBRSxLQUFLO1FBQ1YsVUFBVSxFQUFFLGFBQWE7UUFDekIsYUFBYSxFQUFFLGdCQUFnQjtLQUNoQyxDQUFDO0lBRUYsb0ZBQW9GO0lBQ3BGLHlFQUF5RTtJQUN6RSxNQUFNLENBQUMscUJBQXFCLEdBQUcsVUFBVSxPQUFPLEVBQUUsSUFBSTtRQUNwRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE9BQU8sRUFBRSxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUss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

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-navigation.js":
/*!************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-navigation.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PendingNavigation": () => (/* binding */ PendingNavigation)
/* harmony export */ });
/**
 * Ties together the two separate navigation events that together holds information about both parent frame id and transition-related attributes
 */
class PendingNavigation {
    onBeforeNavigateEventNavigation;
    onCommittedEventNavigation;
    resolveOnBeforeNavigateEventNavigation;
    resolveOnCommittedEventNavigation;
    constructor() {
        this.onBeforeNavigateEventNavigation = new Promise((resolve) => {
            this.resolveOnBeforeNavigateEventNavigation = resolve;
        });
        this.onCommittedEventNavigation = new Promise((resolve) => {
            this.resolveOnCommittedEventNavigation = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeNavigateEventNavigation,
            this.onCommittedEventNavigation,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     *
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise((resolve) => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLW5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQ1osK0JBQStCLENBQXNCO0lBQ3JELDBCQUEwQixDQUFzQjtJQUN6RCxzQ0FBc0MsQ0FBZ0M7SUFDdEUsaUNBQWlDLENBQWdDO0lBQ3hFO1FBQ0UsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLHNDQUFzQyxHQUFHLE9BQU8sQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ00sUUFBUTtRQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsK0JBQStCO1lBQ3BDLElBQUksQ0FBQywwQkFBMEI7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-request.js":
/*!*********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-request.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PendingRequest": () => (/* binding */ PendingRequest)
/* harmony export */ });
/**
 * Ties together the two separate events that together holds information about both request headers and body
 */
class PendingRequest {
    onBeforeRequestEventDetails;
    onBeforeSendHeadersEventDetails;
    resolveOnBeforeRequestEventDetails;
    resolveOnBeforeSendHeadersEventDetails;
    constructor() {
        this.onBeforeRequestEventDetails = new Promise((resolve) => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onBeforeSendHeadersEventDetails = new Promise((resolve) => {
            this.resolveOnBeforeSendHeadersEventDetails = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onBeforeSendHeadersEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     *
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise((resolve) => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUNULDJCQUEyQixDQUFpRDtJQUM1RSwrQkFBK0IsQ0FBcUQ7SUFDN0Ysa0NBQWtDLENBRS9CO0lBQ0gsc0NBQXNDLENBRW5DO0lBQ1Y7UUFDRSxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsa0NBQWtDLEdBQUcsT0FBTyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLHNDQUFzQyxHQUFHLE9BQU8sQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSxRQUFRO1FBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQywyQkFBMkI7WUFDaEMsSUFBSSxDQUFDLCtCQUErQjtTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-response.js":
/*!**********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-response.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PendingResponse": () => (/* binding */ PendingResponse)
/* harmony export */ });
/* harmony import */ var _response_body_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./response-body-listener */ "../webext-instrumentation/build/module/lib/response-body-listener.js");

/**
 * Ties together the two separate events that together holds information about both response headers and body
 */
class PendingResponse {
    onBeforeRequestEventDetails;
    onCompletedEventDetails;
    responseBodyListener;
    resolveOnBeforeRequestEventDetails;
    resolveOnCompletedEventDetails;
    constructor() {
        this.onBeforeRequestEventDetails = new Promise((resolve) => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onCompletedEventDetails = new Promise((resolve) => {
            this.resolveOnCompletedEventDetails = resolve;
        });
    }
    addResponseResponseBodyListener(details) {
        this.responseBodyListener = new _response_body_listener__WEBPACK_IMPORTED_MODULE_0__.ResponseBodyListener(details);
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onCompletedEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     *
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise((resolve) => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGVuZGluZy1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBQ1YsMkJBQTJCLENBQWlEO0lBQzVFLHVCQUF1QixDQUE2QztJQUM3RSxvQkFBb0IsQ0FBdUI7SUFDM0Msa0NBQWtDLENBRS9CO0lBQ0gsOEJBQThCLENBRTNCO0lBQ1Y7UUFDRSxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsa0NBQWtDLEdBQUcsT0FBTyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSwrQkFBK0IsQ0FDcEMsT0FBOEM7UUFFOUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNNLFFBQVE7UUFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLDJCQUEyQjtZQUNoQyxJQUFJLENBQUMsdUJBQXVCO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/response-body-listener.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/response-body-listener.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResponseBodyListener": () => (/* binding */ ResponseBodyListener)
/* harmony export */ });
/* harmony import */ var _sha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256 */ "../webext-instrumentation/build/module/lib/sha256.js");

class ResponseBodyListener {
    responseBody;
    contentHash;
    resolveResponseBody;
    resolveContentHash;
    constructor(details) {
        this.responseBody = new Promise((resolve) => {
            this.resolveResponseBody = resolve;
        });
        this.contentHash = new Promise((resolve) => {
            this.resolveContentHash = resolve;
        });
        // Used to parse Response stream
        const filter = browser.webRequest.filterResponseData(details.requestId.toString());
        let responseBody = new Uint8Array();
        filter.ondata = (event) => {
            (0,_sha256__WEBPACK_IMPORTED_MODULE_0__.digestMessage)(event.data).then((digest) => {
                this.resolveContentHash(digest);
            });
            const incoming = new Uint8Array(event.data);
            const tmp = new Uint8Array(responseBody.length + incoming.length);
            tmp.set(responseBody);
            tmp.set(incoming, responseBody.length);
            responseBody = tmp;
            filter.write(event.data);
        };
        filter.onstop = (_event) => {
            this.resolveResponseBody(responseBody);
            filter.disconnect();
        };
    }
    async getResponseBody() {
        return this.responseBody;
    }
    async getContentHash() {
        return this.contentHash;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UtYm9keS1saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVzcG9uc2UtYm9keS1saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXpDLE1BQU0sT0FBTyxvQkFBb0I7SUFDZCxZQUFZLENBQXNCO0lBQ2xDLFdBQVcsQ0FBa0I7SUFDdEMsbUJBQW1CLENBQXFDO0lBQ3hELGtCQUFrQixDQUFnQztJQUUxRCxZQUFZLE9BQThDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FDdkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FDdEIsQ0FBQztRQUVULElBQUksWUFBWSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hCLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/sha256.js":
/*!************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/sha256.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "digestMessage": () => (/* binding */ digestMessage)
/* harmony export */ });
/**
 * Code from the example at
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
async function digestMessage(msgUint8) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMjU2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zaGEyNTYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsUUFBb0I7SUFDdEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7SUFDdkYsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsK0JBQStCO0lBQ3pGLE1BQU0sT0FBTyxHQUFHLFNBQVM7U0FDdEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsOEJBQThCO0lBQzNDLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/string-utils.js":
/*!******************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/string-utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encode_utf8": () => (/* binding */ encode_utf8),
/* harmony export */   "escapeString": () => (/* binding */ escapeString),
/* harmony export */   "escapeUrl": () => (/* binding */ escapeUrl),
/* harmony export */   "Uint8ToBase64": () => (/* binding */ Uint8ToBase64),
/* harmony export */   "boolToInt": () => (/* binding */ boolToInt)
/* harmony export */ });
function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}
const escapeString = function (str) {
    // Convert to string if necessary
    if (typeof str !== "string") {
        str = String(str);
    }
    return encode_utf8(str);
};
const escapeUrl = function (url, stripDataUrlData = true) {
    url = escapeString(url);
    // data:[<mediatype>][;base64],<data>
    if (url.substr(0, 5) === "data:" &&
        stripDataUrlData &&
        url.indexOf(",") > -1) {
        url = url.substr(0, url.indexOf(",") + 1) + "<data-stripped>";
    }
    return url;
};
// Base64 encoding, found on:
// https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/25644409#25644409
const Uint8ToBase64 = function (u8Arr) {
    const CHUNK_SIZE = 0x8000; // arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = "";
    let slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
};
const boolToInt = function (bool) {
    return bool ? 1 : 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zdHJpbmctdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxVQUFVLEdBQVE7SUFDNUMsaUNBQWlDO0lBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFFRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFDdkIsR0FBVyxFQUNYLG1CQUE0QixJQUFJO0lBRWhDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIscUNBQXFDO0lBQ3JDLElBQ0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTztRQUM1QixnQkFBZ0I7UUFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDckI7UUFDQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztLQUMvRDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsNkJBQTZCO0FBQzdCLHFIQUFxSDtBQUNySCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsVUFBVSxLQUFpQjtJQUN0RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxtQkFBbUI7SUFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM1QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxLQUFpQixDQUFDO0lBQ3RCLE9BQU8sS0FBSyxHQUFHLE1BQU0sRUFBRTtRQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxLQUFLLElBQUksVUFBVSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFVBQVUsSUFBYTtJQUM5QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/uuid.js":
/*!**********************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/uuid.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeUUID": () => (/* binding */ makeUUID)
/* harmony export */ });
/* eslint-disable no-bitwise */
// from https://gist.github.com/jed/982883#gistcomment-2403369
const hex = [];
for (let i = 0; i < 256; i++) {
    hex[i] = (i < 16 ? "0" : "") + i.toString(16);
}
const makeUUID = () => {
    const r = crypto.getRandomValues(new Uint8Array(16));
    r[6] = (r[6] & 0x0f) | 0x40;
    r[8] = (r[8] & 0x3f) | 0x80;
    return (hex[r[0]] +
        hex[r[1]] +
        hex[r[2]] +
        hex[r[3]] +
        "-" +
        hex[r[4]] +
        hex[r[5]] +
        "-" +
        hex[r[6]] +
        hex[r[7]] +
        "-" +
        hex[r[8]] +
        hex[r[9]] +
        "-" +
        hex[r[10]] +
        hex[r[11]] +
        hex[r[12]] +
        hex[r[13]] +
        hex[r[14]] +
        hex[r[15]]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFFL0IsOERBQThEO0FBQzlELE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQy9DO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTVCLE9BQU8sQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNYLENBQUM7QUFDSixDQUFDLENBQUMifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/schema.js":
/*!********************************************************!*\
  !*** ../webext-instrumentation/build/module/schema.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateTimeUnicodeFormatString": () => (/* binding */ dateTimeUnicodeFormatString)
/* harmony export */ });
// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
const dateTimeUnicodeFormatString = "yyyy-MM-dd'T'HH:mm:ss.SSSXX";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSwrRUFBK0U7QUFDL0UsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsNkJBQTZCLENBQUMifQ==

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./content.js/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openwpm-webext-instrumentation */ "../webext-instrumentation/build/module/index.js");


(0,openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__.injectJavascriptInstrumentPageScript)(window.openWpmContentScriptConfig || {});
delete window.openWpmContentScriptConfig;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9iYWNrZ3JvdW5kL2Nvb2tpZS1pbnN0cnVtZW50LmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvZG5zLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvYmFja2dyb3VuZC9odHRwLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvYmFja2dyb3VuZC9qYXZhc2NyaXB0LWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvYmFja2dyb3VuZC9uYXZpZ2F0aW9uLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS5qcyIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9jb250ZW50L2phdmFzY3JpcHQtaW5zdHJ1bWVudC1wYWdlLXNjb3BlLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9odHRwLXBvc3QtcGFyc2VyLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9qcy1pbnN0cnVtZW50cy5qcyIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvcGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3BlbmRpbmctcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3Jlc3BvbnNlLWJvZHktbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvc3RyaW5nLXV0aWxzLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi91dWlkLmpzIiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL3NjaGVtYS5qcyIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQG9wZW53cG0vd2ViZXh0LWZpcmVmb3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ab3BlbndwbS93ZWJleHQtZmlyZWZveC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BvcGVud3BtL3dlYmV4dC1maXJlZm94Ly4vY29udGVudC5qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUY7QUFDWjtBQUNQO0FBQ3ZEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDREQUFTO0FBQzdDLG9DQUFvQyw0REFBUztBQUM3QyxrQ0FBa0MsNERBQVM7QUFDM0MsNEJBQTRCLCtEQUFZO0FBQ3hDLGlDQUFpQyw0REFBUztBQUMxQyw0QkFBNEIsK0RBQVk7QUFDeEMsNEJBQTRCLCtEQUFZO0FBQ3hDLDZC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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTm9GOztBQUVwRixvR0FBb0Msd0NBQXdDO0FBQzVFIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYSA9IChjb29raWUpID0+IHtcbiAgICBjb25zdCBqYXZhc2NyaXB0Q29va2llID0ge307XG4gICAgLy8gRXhwaXJ5IHRpbWUgKGluIHNlY29uZHMpXG4gICAgLy8gTWF5IHJldHVybiB+TWF4KGludDY0KS4gSSBiZWxpZXZlIHRoaXMgaXMgYSBzZXNzaW9uXG4gICAgLy8gY29va2llIHdoaWNoIGRvZXNuJ3QgZXhwaXJlLiBTZXNzaW9ucyBjb29raWVzIHdpdGhcbiAgICAvLyBub24tbWF4IGV4cGlyeSB0aW1lIGV4cGlyZSBhZnRlciBzZXNzaW9uIG9yIGF0IGV4cGlyeS5cbiAgICBjb25zdCBleHBpcnlUaW1lID0gY29va2llLmV4cGlyYXRpb25EYXRlOyAvLyByZXR1cm5zIHNlY29uZHNcbiAgICBsZXQgZXhwaXJ5VGltZVN0cmluZztcbiAgICBjb25zdCBtYXhJbnQ2NCA9IDkyMjMzNzIwMzY4NTQ3NzYwMDA7XG4gICAgaWYgKCFjb29raWUuZXhwaXJhdGlvbkRhdGUgfHwgZXhwaXJ5VGltZSA9PT0gbWF4SW50NjQpIHtcbiAgICAgICAgZXhwaXJ5VGltZVN0cmluZyA9IFwiOTk5OS0xMi0zMVQyMTo1OTo1OS4wMDBaXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBleHBpcnlUaW1lRGF0ZSA9IG5ldyBEYXRlKGV4cGlyeVRpbWUgKiAxMDAwKTsgLy8gcmVxdWlyZXMgbWlsbGlzZWNvbmRzXG4gICAgICAgIGV4cGlyeVRpbWVTdHJpbmcgPSBleHBpcnlUaW1lRGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBqYXZhc2NyaXB0Q29va2llLmV4cGlyeSA9IGV4cGlyeVRpbWVTdHJpbmc7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19odHRwX29ubHkgPSBib29sVG9JbnQoY29va2llLmh0dHBPbmx5KTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX2hvc3Rfb25seSA9IGJvb2xUb0ludChjb29raWUuaG9zdE9ubHkpO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfc2Vzc2lvbiA9IGJvb2xUb0ludChjb29raWUuc2Vzc2lvbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5ob3N0ID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5kb21haW4pO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfc2VjdXJlID0gYm9vbFRvSW50KGNvb2tpZS5zZWN1cmUpO1xuICAgIGphdmFzY3JpcHRDb29raWUubmFtZSA9IGVzY2FwZVN0cmluZyhjb29raWUubmFtZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5wYXRoID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5wYXRoKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnZhbHVlID0gZXNjYXBlU3RyaW5nKGNvb2tpZS52YWx1ZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5zYW1lX3NpdGUgPSBlc2NhcGVTdHJpbmcoY29va2llLnNhbWVTaXRlKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmZpcnN0X3BhcnR5X2RvbWFpbiA9IGVzY2FwZVN0cmluZyhjb29raWUuZmlyc3RQYXJ0eURvbWFpbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5zdG9yZV9pZCA9IGVzY2FwZVN0cmluZyhjb29raWUuc3RvcmVJZCk7XG4gICAgamF2YXNjcmlwdENvb2tpZS50aW1lX3N0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHJldHVybiBqYXZhc2NyaXB0Q29va2llO1xufTtcbmV4cG9ydCBjbGFzcyBDb29raWVJbnN0cnVtZW50IHtcbiAgICBkYXRhUmVjZWl2ZXI7XG4gICAgb25DaGFuZ2VkTGlzdGVuZXI7XG4gICAgY29uc3RydWN0b3IoZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICAvLyBJbnN0cnVtZW50IGNvb2tpZSBjaGFuZ2VzXG4gICAgICAgIHRoaXMub25DaGFuZ2VkTGlzdGVuZXIgPSBhc3luYyAoY2hhbmdlSW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gY2hhbmdlSW5mby5yZW1vdmVkID8gXCJkZWxldGVkXCIgOiBcImFkZGVkLW9yLWNoYW5nZWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICByZWNvcmRfdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgIGNoYW5nZV9jYXVzZTogY2hhbmdlSW5mby5jYXVzZSxcbiAgICAgICAgICAgICAgICBicm93c2VyX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgICAgIGV2ZW50X29yZGluYWw6IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCksXG4gICAgICAgICAgICAgICAgLi4udHJhbnNmb3JtQ29va2llT2JqZWN0VG9NYXRjaE9wZW5XUE1TY2hlbWEoY2hhbmdlSW5mby5jb29raWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0X2Nvb2tpZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci5jb29raWVzLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ2hhbmdlZExpc3RlbmVyKTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZUFsbENvb2tpZXMoY3Jhd2xJRCkge1xuICAgICAgICBjb25zdCBhbGxDb29raWVzID0gYXdhaXQgYnJvd3Nlci5jb29raWVzLmdldEFsbCh7fSk7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFsbENvb2tpZXMubWFwKChjb29raWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICByZWNvcmRfdHlwZTogXCJtYW51YWwtZXhwb3J0XCIsXG4gICAgICAgICAgICAgICAgYnJvd3Nlcl9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgICAgICAgICAuLi50cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYShjb29raWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdF9jb29raWVzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIuY29va2llcy5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNoYW5nZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMjl2YTJsbExXbHVjM1J5ZFcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZbUZqYTJkeWIzVnVaQzlqYjI5cmFXVXRhVzV6ZEhKMWJXVnVkQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVVVzVFVGQlRTeDNRMEZCZDBNc1EwRkJRenRCUVVOcVJpeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTd3JRa0ZCSzBJc1EwRkJRenRCUVVOeVJTeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hOUVVGTkxIRkNRVUZ4UWl4RFFVRkRPMEZCU3psRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEhsRFFVRjVReXhIUVVGSExFTkJRVU1zVFVGQll5eEZRVUZGTEVWQlFVVTdTVUZETVVVc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4RlFVRnpRaXhEUVVGRE8wbEJSV2hFTERKQ1FVRXlRanRKUVVNelFpeHpSRUZCYzBRN1NVRkRkRVFzY1VSQlFYRkVPMGxCUTNKRUxIbEVRVUY1UkR0SlFVTjZSQ3hOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc2EwSkJRV3RDTzBsQlF6VkVMRWxCUVVrc1owSkJRV2RDTEVOQlFVTTdTVUZEY2tJc1RVRkJUU3hSUVVGUkxFZEJRVWNzYlVKQlFXMUNMRU5CUVVNN1NVRkRja01zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4alFVRmpMRWxCUVVrc1ZVRkJWU3hMUVVGTExGRkJRVkVzUlVGQlJUdFJRVU55UkN4blFrRkJaMElzUjBGQlJ5d3dRa0ZCTUVJc1EwRkJRenRMUVVNdlF6dFRRVUZOTzFGQlEwd3NUVUZCVFN4alFVRmpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc2QwSkJRWGRDTzFGQlF6VkZMR2RDUVVGblFpeEhRVUZITEdOQlFXTXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRMUVVOcVJEdEpRVU5FTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRKUVVNelF5eG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhWUVVGVkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRKUVVWNFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOMFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4WlFVRlpMRU5CUVVNc1RVRkJUU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1NVRkROVVVzWjBKQlFXZENMRU5CUVVNc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkZla1FzWjBKQlFXZENMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1NVRkZka1FzVDBGQlR5eG5Ra0ZCWjBJc1EwRkJRenRCUVVNeFFpeERRVUZETEVOQlFVTTdRVUZGUml4TlFVRk5MRTlCUVU4c1owSkJRV2RDTzBsQlExWXNXVUZCV1N4RFFVRkRPMGxCUTNSQ0xHbENRVUZwUWl4RFFVRkRPMGxCUlRGQ0xGbEJRVmtzV1VGQldUdFJRVU4wUWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExGbEJRVmtzUTBGQlF6dEpRVU51UXl4RFFVRkRPMGxCUlUwc1IwRkJSeXhEUVVGRExFOUJRVTg3VVVGRGFFSXNORUpCUVRSQ08xRkJRelZDTEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUjBGQlJ5eExRVUZMTEVWQlFVVXNWVUZQTDBJc1JVRkJSU3hGUVVGRk8xbEJRMGdzVFVGQlRTeFRRVUZUTEVkQlFVY3NWVUZCVlN4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4clFrRkJhMElzUTBGQlF6dFpRVU4wUlN4TlFVRk5MRTFCUVUwc1IwRkJNa0k3WjBKQlEzSkRMRmRCUVZjc1JVRkJSU3hUUVVGVE8yZENRVU4wUWl4WlFVRlpMRVZCUVVVc1ZVRkJWU3hEUVVGRExFdEJRVXM3WjBKQlF6bENMRlZCUVZVc1JVRkJSU3hQUVVGUE8yZENRVU51UWl4elFrRkJjMElzUlVGQlJTeHZRa0ZCYjBJN1owSkJRelZETEdGQlFXRXNSVUZCUlN4MVFrRkJkVUlzUlVGQlJUdG5Ra0ZEZUVNc1IwRkJSeXg1UTBGQmVVTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1RVRkJUU3hEUVVGRE8yRkJRMmhGTEVOQlFVTTdXVUZEUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGVkJRVlVzUTBGQlF5eHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU0zUkN4RFFVRkRMRU5CUVVNN1VVRkRSaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4alFVRmpMRU5CUVVNc1QwRkJUenRSUVVOcVF5eE5RVUZOTEZWQlFWVXNSMEZCUnl4TlFVRk5MRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNCRUxFMUJRVTBzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZEWml4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVFVGQll5eEZRVUZGTEVWQlFVVTdXVUZEYUVNc1RVRkJUU3hOUVVGTkxFZEJRVEpDTzJkQ1FVTnlReXhYUVVGWExFVkJRVVVzWlVGQlpUdG5Ra0ZETlVJc1ZVRkJWU3hGUVVGRkxFOUJRVTg3WjBKQlEyNUNMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRuUWtGRE5VTXNSMEZCUnl4NVEwRkJlVU1zUTBGQlF5eE5RVUZOTEVOQlFVTTdZVUZEY2tRc1EwRkJRenRaUVVOR0xFOUJRVThzU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRjRVVzUTBGQlF5eERRVUZETEVOQlEwZ3NRMEZCUXp0SlFVTktMRU5CUVVNN1NVRkZUU3hQUVVGUE8xRkJRMW9zU1VGQlNTeEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVU3V1VGRE1VSXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzFOQlEyeEZPMGxCUTBnc1EwRkJRenREUVVOR0luMD0iLCJpbXBvcnQgeyBQZW5kaW5nUmVzcG9uc2UgfSBmcm9tIFwiLi4vbGliL3BlbmRpbmctcmVzcG9uc2VcIjtcbmltcG9ydCB7IGFsbFR5cGVzIH0gZnJvbSBcIi4vaHR0cC1pbnN0cnVtZW50XCI7XG5leHBvcnQgY2xhc3MgRG5zSW5zdHJ1bWVudCB7XG4gICAgZGF0YVJlY2VpdmVyO1xuICAgIG9uQ29tcGxldGVMaXN0ZW5lcjtcbiAgICBwZW5kaW5nUmVzcG9uc2VzID0ge307XG4gICAgY29uc3RydWN0b3IoZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHVybHM6IFtcIjxhbGxfdXJscz5cIl0sIHR5cGVzOiBhbGxUeXBlcyB9O1xuICAgICAgICBjb25zdCByZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uID0gKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoZGV0YWlscy5vcmlnaW5VcmwgJiZcbiAgICAgICAgICAgICAgICBkZXRhaWxzLm9yaWdpblVybC5pbmRleE9mKFwibW96LWV4dGVuc2lvbjovL1wiKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcmlnaW5VcmwuaW5jbHVkZXMoXCJmYWtlUmVxdWVzdFwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qXG4gICAgICAgICAqIEF0dGFjaCBoYW5kbGVycyB0byBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25Db21wbGV0ZUxpc3RlbmVyID0gKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1Jlc3BvbnNlID0gdGhpcy5nZXRQZW5kaW5nUmVzcG9uc2UoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLnJlc29sdmVPbkNvbXBsZXRlZEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZURuc0hhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tcGxldGVMaXN0ZW5lciwgZmlsdGVyKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25Db21wbGV0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNvbXBsZXRlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFBlbmRpbmdSZXNwb25zZShyZXF1ZXN0SWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXSkge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF0gPSBuZXcgUGVuZGluZ1Jlc3BvbnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdO1xuICAgIH1cbiAgICBoYW5kbGVSZXNvbHZlZERuc0RhdGEoZG5zUmVjb3JkT2JqLCBkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgLy8gQ3VycmluZyB0aGUgZGF0YSByZXR1cm5lZCBieSBBUEkgY2FsbC5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgIC8vIEdldCBkYXRhIGZyb20gQVBJIGNhbGxcbiAgICAgICAgICAgIGRuc1JlY29yZE9iai5hZGRyZXNzZXMgPSByZWNvcmQuYWRkcmVzc2VzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBkbnNSZWNvcmRPYmouY2Fub25pY2FsX25hbWUgPSByZWNvcmQuY2Fub25pY2FsTmFtZTtcbiAgICAgICAgICAgIGRuc1JlY29yZE9iai5pc19UUlIgPSByZWNvcmQuaXNUUlI7XG4gICAgICAgICAgICAvLyBTZW5kIGRhdGEgdG8gbWFpbiBPcGVuV1BNIGRhdGEgYWdncmVnYXRvci5cbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiZG5zX3Jlc3BvbnNlc1wiLCBkbnNSZWNvcmRPYmopO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBvbkNvbXBsZXRlRG5zSGFuZGxlcihkZXRhaWxzLCBjcmF3bElEKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhbmQgcG9wdWxhdGUgRG5zUmVzb2x2ZSBvYmplY3RcbiAgICAgICAgY29uc3QgZG5zUmVjb3JkID0ge307XG4gICAgICAgIGRuc1JlY29yZC5icm93c2VyX2lkID0gY3Jhd2xJRDtcbiAgICAgICAgZG5zUmVjb3JkLnJlcXVlc3RfaWQgPSBOdW1iZXIoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICBkbnNSZWNvcmQudXNlZF9hZGRyZXNzID0gZGV0YWlscy5pcDtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCk7XG4gICAgICAgIGRuc1JlY29yZC50aW1lX3N0YW1wID0gY3VycmVudFRpbWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgLy8gUXVlcnkgRE5TIEFQSVxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGRldGFpbHMudXJsKTtcbiAgICAgICAgZG5zUmVjb3JkLmhvc3RuYW1lID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICBjb25zdCBkbnNSZXNvbHZlID0gYnJvd3Nlci5kbnMucmVzb2x2ZShkbnNSZWNvcmQuaG9zdG5hbWUsIFtcbiAgICAgICAgICAgIFwiY2Fub25pY2FsX25hbWVcIixcbiAgICAgICAgXSk7XG4gICAgICAgIGRuc1Jlc29sdmUudGhlbih0aGlzLmhhbmRsZVJlc29sdmVkRG5zRGF0YShkbnNSZWNvcmQsIHRoaXMuZGF0YVJlY2VpdmVyKSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc1ekxXbHVjM1J5ZFcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZbUZqYTJkeWIzVnVaQzlrYm5NdGFXNXpkSEoxYldWdWRDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc1pVRkJaU3hGUVVGRkxFMUJRVTBzZVVKQlFYbENMRU5CUVVNN1FVRkhNVVFzVDBGQlR5eEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRzFDUVVGdFFpeERRVUZETzBGQlJ6ZERMRTFCUVUwc1QwRkJUeXhoUVVGaE8wbEJRMUFzV1VGQldTeERRVUZETzBsQlEzUkNMR3RDUVVGclFpeERRVUZETzBsQlEyNUNMR2RDUVVGblFpeEhRVVZ3UWl4RlFVRkZMRU5CUVVNN1NVRkZVQ3haUVVGWkxGbEJRVms3VVVGRGRFSXNTVUZCU1N4RFFVRkRMRmxCUVZrc1IwRkJSeXhaUVVGWkxFTkJRVU03U1VGRGJrTXNRMEZCUXp0SlFVVk5MRWRCUVVjc1EwRkJReXhQUVVGUE8xRkJRMmhDTEUxQlFVMHNUVUZCVFN4SFFVRnJRaXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETEZsQlFWa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hSUVVGUkxFVkJRVVVzUTBGQlF6dFJRVVY0UlN4TlFVRk5MSGxDUVVGNVFpeEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVN1dVRkROVU1zVDBGQlR5eERRVU5NTEU5QlFVOHNRMEZCUXl4VFFVRlRPMmRDUVVOcVFpeFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTlCUVU4c1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGJFUXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlF6RkRMRU5CUVVNN1VVRkRTaXhEUVVGRExFTkJRVU03VVVGRlJqczdWMEZGUnp0UlFVTklMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4RFFVRkRMRTlCUVRCRExFVkJRVVVzUlVGQlJUdFpRVU4yUlN4eFEwRkJjVU03V1VGRGNrTXNTVUZCU1N4NVFrRkJlVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRkRU1zVDBGQlR6dGhRVU5TTzFsQlEwUXNUVUZCVFN4bFFVRmxMRWRCUVVjc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFpRVU51UlN4bFFVRmxMRU5CUVVNc09FSkJRVGhDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1dVRkZlRVFzU1VGQlNTeERRVUZETEc5Q1FVRnZRaXhEUVVGRExFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTTVReXhEUVVGRExFTkJRVU03VVVGRlJpeFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMRmRCUVZjc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEd0Q1FVRnJRaXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzBsQlF6bEZMRU5CUVVNN1NVRkZUU3hQUVVGUE8xRkJRMW9zU1VGQlNTeEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFVkJRVVU3V1VGRE0wSXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhYUVVGWExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETzFOQlEzaEZPMGxCUTBnc1EwRkJRenRKUVVWUExHdENRVUZyUWl4RFFVRkRMRk5CUVZNN1VVRkRiRU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eFRRVUZUTEVOQlFVTXNSVUZCUlR0WlFVTnlReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVWNzU1VGQlNTeGxRVUZsTEVWQlFVVXNRMEZCUXp0VFFVTXhSRHRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNN1NVRkZUeXh4UWtGQmNVSXNRMEZCUXl4WlFVRlpMRVZCUVVVc1dVRkJXVHRSUVVOMFJDeDVRMEZCZVVNN1VVRkRla01zVDBGQlR5eFZRVUZWTEUxQlFVMDdXVUZEY2tJc2VVSkJRWGxDTzFsQlEzcENMRmxCUVZrc1EwRkJReXhUUVVGVExFZEJRVWNzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVOeVJDeFpRVUZaTEVOQlFVTXNZMEZCWXl4SFFVRkhMRTFCUVUwc1EwRkJReXhoUVVGaExFTkJRVU03V1VGRGJrUXNXVUZCV1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlJXNURMRFpEUVVFMlF6dFpRVU0zUXl4WlFVRlpMRU5CUVVNc1ZVRkJWU3hEUVVGRExHVkJRV1VzUlVGQlJTeFpRVUZaTEVOQlFVTXNRMEZCUXp0UlFVTjZSQ3hEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVOHNTMEZCU3l4RFFVRkRMRzlDUVVGdlFpeERRVU5vUXl4UFFVRXdReXhGUVVNeFF5eFBRVUZQTzFGQlJWQXNkME5CUVhkRE8xRkJRM2hETEUxQlFVMHNVMEZCVXl4SFFVRkhMRVZCUVdsQ0xFTkJRVU03VVVGRGNFTXNVMEZCVXl4RFFVRkRMRlZCUVZVc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGREwwSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1IwRkJSeXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTJwRUxGTkJRVk1zUTBGQlF5eFpRVUZaTEVkQlFVY3NUMEZCVHl4RFFVRkRMRVZCUVVVc1EwRkJRenRSUVVOd1F5eE5RVUZOTEZkQlFWY3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEYUVRc1UwRkJVeXhEUVVGRExGVkJRVlVzUjBGQlJ5eFhRVUZYTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1VVRkZha1FzWjBKQlFXZENPMUZCUTJoQ0xFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5xUXl4VFFVRlRMRU5CUVVNc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZEYkVNc1RVRkJUU3hWUVVGVkxFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUlVGQlJUdFpRVU42UkN4blFrRkJaMEk3VTBGRGFrSXNRMEZCUXl4RFFVRkRPMUZCUTBnc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zVTBGQlV5eEZRVUZGTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRelZGTEVOQlFVTTdRMEZEUmlKOSIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgSHR0cFBvc3RQYXJzZXIgfSBmcm9tIFwiLi4vbGliL2h0dHAtcG9zdC1wYXJzZXJcIjtcbmltcG9ydCB7IFBlbmRpbmdSZXF1ZXN0IH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLXJlcXVlc3RcIjtcbmltcG9ydCB7IFBlbmRpbmdSZXNwb25zZSB9IGZyb20gXCIuLi9saWIvcGVuZGluZy1yZXNwb25zZVwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcsIGVzY2FwZVVybCB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG4vKipcbiAqIE5vdGU6IERpZmZlcmVudCBwYXJ0cyBvZiB0aGUgZGVzaXJlZCBpbmZvcm1hdGlvbiBhcnJpdmVzIGluIGRpZmZlcmVudCBldmVudHMgYXMgcGVyIGJlbG93OlxuICogcmVxdWVzdCA9IGhlYWRlcnMgaW4gb25CZWZvcmVTZW5kSGVhZGVycyArIGJvZHkgaW4gb25CZWZvcmVSZXF1ZXN0XG4gKiByZXNwb25zZSA9IGhlYWRlcnMgaW4gb25Db21wbGV0ZWQgKyBib2R5IHZpYSBhIG9uQmVmb3JlUmVxdWVzdCBmaWx0ZXJcbiAqIHJlZGlyZWN0ID0gb3JpZ2luYWwgcmVxdWVzdCBoZWFkZXJzK2JvZHksIGZvbGxvd2VkIGJ5IGEgb25CZWZvcmVSZWRpcmVjdCBhbmQgdGhlbiBhIG5ldyBzZXQgb2YgcmVxdWVzdCBoZWFkZXJzK2JvZHkgYW5kIHJlc3BvbnNlIGhlYWRlcnMrYm9keVxuICogRG9jczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Vc2VyOndiYW1iZXJnL3dlYlJlcXVlc3QuUmVxdWVzdERldGFpbHNcbiAqL1xuY29uc3QgYWxsVHlwZXMgPSBbXG4gICAgXCJiZWFjb25cIixcbiAgICBcImNzcF9yZXBvcnRcIixcbiAgICBcImZvbnRcIixcbiAgICBcImltYWdlXCIsXG4gICAgXCJpbWFnZXNldFwiLFxuICAgIFwibWFpbl9mcmFtZVwiLFxuICAgIFwibWVkaWFcIixcbiAgICBcIm9iamVjdFwiLFxuICAgIFwib2JqZWN0X3N1YnJlcXVlc3RcIixcbiAgICBcInBpbmdcIixcbiAgICBcInNjcmlwdFwiLFxuICAgIFwic3BlY3VsYXRpdmVcIixcbiAgICBcInN0eWxlc2hlZXRcIixcbiAgICBcInN1Yl9mcmFtZVwiLFxuICAgIFwid2ViX21hbmlmZXN0XCIsXG4gICAgXCJ3ZWJzb2NrZXRcIixcbiAgICBcInhtbF9kdGRcIixcbiAgICBcInhtbGh0dHByZXF1ZXN0XCIsXG4gICAgXCJ4c2x0XCIsXG4gICAgXCJvdGhlclwiLFxuXTtcbmV4cG9ydCB7IGFsbFR5cGVzIH07XG5leHBvcnQgY2xhc3MgSHR0cEluc3RydW1lbnQge1xuICAgIGRhdGFSZWNlaXZlcjtcbiAgICBwZW5kaW5nUmVxdWVzdHMgPSB7fTtcbiAgICBwZW5kaW5nUmVzcG9uc2VzID0ge307XG4gICAgb25CZWZvcmVSZXF1ZXN0TGlzdGVuZXI7XG4gICAgb25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyO1xuICAgIG9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lcjtcbiAgICBvbkNvbXBsZXRlZExpc3RlbmVyO1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQsIHNhdmVDb250ZW50T3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgdXJsczogW1wiPGFsbF91cmxzPlwiXSwgdHlwZXM6IGFsbFR5cGVzIH07XG4gICAgICAgIGNvbnN0IHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24gPSAoZGV0YWlscykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChkZXRhaWxzLm9yaWdpblVybCAmJiBkZXRhaWxzLm9yaWdpblVybC5pbmRleE9mKFwibW96LWV4dGVuc2lvbjovL1wiKSA+IC0xKTtcbiAgICAgICAgfTtcbiAgICAgICAgLypcbiAgICAgICAgICogQXR0YWNoIGhhbmRsZXJzIHRvIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lciA9IChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nID0ge307XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVzcG9uc2UgPSB0aGlzLmdldFBlbmRpbmdSZXNwb25zZShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFNhdmVDb250ZW50KHNhdmVDb250ZW50T3B0aW9uLCBkZXRhaWxzLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLmFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tpbmdSZXNwb25zZVRoYXREb2VzTm90aGluZztcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyLCBmaWx0ZXIsIHRoaXMuaXNDb250ZW50U2F2aW5nRW5hYmxlZChzYXZlQ29udGVudE9wdGlvbilcbiAgICAgICAgICAgID8gW1wicmVxdWVzdEJvZHlcIiwgXCJibG9ja2luZ1wiXVxuICAgICAgICAgICAgOiBbXCJyZXF1ZXN0Qm9keVwiXSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyID0gKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzKGRldGFpbHMpO1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlU2VuZEhlYWRlcnMuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzTGlzdGVuZXIsIGZpbHRlciwgW1wicmVxdWVzdEhlYWRlcnNcIl0pO1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lciA9IChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZWRpcmVjdEhhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlZGlyZWN0LmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyLCBmaWx0ZXIsIFtcInJlc3BvbnNlSGVhZGVyc1wiXSk7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lciA9IChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5yZXNvbHZlT25Db21wbGV0ZWRFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVkSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpLCBzYXZlQ29udGVudE9wdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIsIGZpbHRlciwgW1wicmVzcG9uc2VIZWFkZXJzXCJdKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVTZW5kSGVhZGVycy5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZWRpcmVjdC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQ29tcGxldGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNDb250ZW50U2F2aW5nRW5hYmxlZChzYXZlQ29udGVudE9wdGlvbikge1xuICAgICAgICBpZiAoc2F2ZUNvbnRlbnRPcHRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYXZlQ29udGVudE9wdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlQ29udGVudFJlc291cmNlVHlwZXMoc2F2ZUNvbnRlbnRPcHRpb24pLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIHNhdmVDb250ZW50UmVzb3VyY2VUeXBlcyhzYXZlQ29udGVudE9wdGlvbikge1xuICAgICAgICByZXR1cm4gc2F2ZUNvbnRlbnRPcHRpb24uc3BsaXQoXCIsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXZSByZWx5IG9uIHRoZSByZXNvdXJjZSB0eXBlIHRvIGZpbHRlciByZXNwb25zZXNcbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3dlYlJlcXVlc3QvUmVzb3VyY2VUeXBlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2F2ZUNvbnRlbnRPcHRpb25cbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VUeXBlXG4gICAgICovXG4gICAgc2hvdWxkU2F2ZUNvbnRlbnQoc2F2ZUNvbnRlbnRPcHRpb24sIHJlc291cmNlVHlwZSkge1xuICAgICAgICBpZiAoc2F2ZUNvbnRlbnRPcHRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYXZlQ29udGVudE9wdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlQ29udGVudFJlc291cmNlVHlwZXMoc2F2ZUNvbnRlbnRPcHRpb24pLmluY2x1ZGVzKHJlc291cmNlVHlwZSk7XG4gICAgfVxuICAgIGdldFBlbmRpbmdSZXF1ZXN0KHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0gPSBuZXcgUGVuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXTtcbiAgICB9XG4gICAgZ2V0UGVuZGluZ1Jlc3BvbnNlKHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXSA9IG5ldyBQZW5kaW5nUmVzcG9uc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF07XG4gICAgfVxuICAgIC8qXG4gICAgICogSFRUUCBSZXF1ZXN0IEhhbmRsZXIgYW5kIEhlbHBlciBGdW5jdGlvbnNcbiAgICAgKi9cbiAgICBhc3luYyBvbkJlZm9yZVNlbmRIZWFkZXJzSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwpIHtcbiAgICAgICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgICAgICA/IGF3YWl0IGJyb3dzZXIudGFicy5nZXQoZGV0YWlscy50YWJJZClcbiAgICAgICAgICAgIDogeyB3aW5kb3dJZDogdW5kZWZpbmVkLCBpbmNvZ25pdG86IHVuZGVmaW5lZCwgdXJsOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQodGFiLmluY29nbml0byk7XG4gICAgICAgIHVwZGF0ZS5icm93c2VyX2lkID0gY3Jhd2xJRDtcbiAgICAgICAgdXBkYXRlLmV4dGVuc2lvbl9zZXNzaW9uX3V1aWQgPSBleHRlbnNpb25TZXNzaW9uVXVpZDtcbiAgICAgICAgdXBkYXRlLmV2ZW50X29yZGluYWwgPSBldmVudE9yZGluYWw7XG4gICAgICAgIHVwZGF0ZS53aW5kb3dfaWQgPSB0YWIud2luZG93SWQ7XG4gICAgICAgIHVwZGF0ZS50YWJfaWQgPSBkZXRhaWxzLnRhYklkO1xuICAgICAgICB1cGRhdGUuZnJhbWVfaWQgPSBkZXRhaWxzLmZyYW1lSWQ7XG4gICAgICAgIC8vIHJlcXVlc3RJZCBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gbGluayByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICAgICAgIHVwZGF0ZS5yZXF1ZXN0X2lkID0gTnVtYmVyKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIHVwZGF0ZS51cmwgPSBlc2NhcGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IGRldGFpbHMubWV0aG9kO1xuICAgICAgICB1cGRhdGUubWV0aG9kID0gZXNjYXBlU3RyaW5nKHJlcXVlc3RNZXRob2QpO1xuICAgICAgICBjb25zdCBjdXJyZW50X3RpbWUgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCk7XG4gICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gY3VycmVudF90aW1lLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGxldCBlbmNvZGluZ1R5cGUgPSBcIlwiO1xuICAgICAgICBsZXQgcmVmZXJyZXIgPSBcIlwiO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gW107XG4gICAgICAgIGxldCBpc09jc3AgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRldGFpbHMucmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVxdWVzdEhlYWRlcnMubWFwKChyZXF1ZXN0SGVhZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gcmVxdWVzdEhlYWRlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJfcGFpciA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXJfcGFpcik7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiQ29udGVudC1UeXBlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RpbmdUeXBlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmNvZGluZ1R5cGUuaW5kZXhPZihcImFwcGxpY2F0aW9uL29jc3AtcmVxdWVzdFwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT2NzcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiUmVmZXJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLnJlZmVycmVyID0gZXNjYXBlU3RyaW5nKHJlZmVycmVyKTtcbiAgICAgICAgaWYgKHJlcXVlc3RNZXRob2QgPT09IFwiUE9TVFwiICYmICFpc09jc3AgLyogZG9uJ3QgcHJvY2VzcyBPQ1NQIHJlcXVlc3RzICovKSB7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVxdWVzdCA9IHRoaXMuZ2V0UGVuZGluZ1JlcXVlc3QoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBwZW5kaW5nUmVxdWVzdC5yZXNvbHZlZFdpdGhpblRpbWVvdXQoMTAwMCk7XG4gICAgICAgICAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJQZW5kaW5nIHJlcXVlc3QgdGltZWQgb3V0IHdhaXRpbmcgZm9yIGRhdGEgZnJvbSBib3RoIG9uQmVmb3JlUmVxdWVzdCBhbmQgb25CZWZvcmVTZW5kSGVhZGVycyBldmVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBhd2FpdCBwZW5kaW5nUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMucmVxdWVzdEJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RQYXJzZXIgPSBuZXcgSHR0cFBvc3RQYXJzZXIob25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLCB0aGlzLmRhdGFSZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RPYmogPSBwb3N0UGFyc2VyLnBhcnNlUG9zdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIChQT1NUKSByZXF1ZXN0IGhlYWRlcnMgZnJvbSB1cGxvYWQgc3RyZWFtXG4gICAgICAgICAgICAgICAgICAgIGlmIChcInBvc3RfaGVhZGVyc1wiIGluIHBvc3RPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgc3RvcmUgUE9TVCBoZWFkZXJzIHRoYXQgd2Uga25vdyBhbmQgbmVlZC4gV2UgbWF5IG1pc2ludGVycHJldCBQT1NUIGRhdGEgYXMgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgZGV0ZWN0aW9uIGlzIGJhc2VkIG9uIFwia2V5OnZhbHVlXCIgZm9ybWF0IChub24taGVhZGVyIFBPU1QgZGF0YSBjYW4gYmUgaW4gdGhpcyBmb3JtYXQgYXMgd2VsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIZWFkZXJzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LURpc3Bvc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBwb3N0T2JqLnBvc3RfaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50SGVhZGVycy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJfcGFpciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHBvc3RPYmoucG9zdF9oZWFkZXJzW25hbWVdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXJfcGFpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIHN0b3JlIFBPU1QgYm9keSBpbiBKU09OIGZvcm1hdCwgZXhjZXB0IHdoZW4gaXQncyBhIHN0cmluZyB3aXRob3V0IGEgKGtleS12YWx1ZSkgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgIGlmIChcInBvc3RfYm9keVwiIGluIHBvc3RPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5wb3N0X2JvZHkgPSBwb3N0T2JqLnBvc3RfYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJwb3N0X2JvZHlfcmF3XCIgaW4gcG9zdE9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnBvc3RfYm9keV9yYXcgPSBwb3N0T2JqLnBvc3RfYm9keV9yYXc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLmhlYWRlcnMgPSBKU09OLnN0cmluZ2lmeShoZWFkZXJzKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgeGhyXG4gICAgICAgIGNvbnN0IGlzWEhSID0gZGV0YWlscy50eXBlID09PSBcInhtbGh0dHByZXF1ZXN0XCI7XG4gICAgICAgIHVwZGF0ZS5pc19YSFIgPSBib29sVG9JbnQoaXNYSFIpO1xuICAgICAgICAvLyBHcmFiIHRoZSB0cmlnZ2VyaW5nIGFuZCBsb2FkaW5nIFByaW5jaXBhbHNcbiAgICAgICAgbGV0IHRyaWdnZXJpbmdPcmlnaW47XG4gICAgICAgIGxldCBsb2FkaW5nT3JpZ2luO1xuICAgICAgICBpZiAoZGV0YWlscy5vcmlnaW5VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZE9yaWdpblVybCA9IG5ldyBVUkwoZGV0YWlscy5vcmlnaW5VcmwpO1xuICAgICAgICAgICAgdHJpZ2dlcmluZ09yaWdpbiA9IHBhcnNlZE9yaWdpblVybC5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRldGFpbHMuZG9jdW1lbnRVcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZERvY3VtZW50VXJsID0gbmV3IFVSTChkZXRhaWxzLmRvY3VtZW50VXJsKTtcbiAgICAgICAgICAgIGxvYWRpbmdPcmlnaW4gPSBwYXJzZWREb2N1bWVudFVybC5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLnRyaWdnZXJpbmdfb3JpZ2luID0gZXNjYXBlU3RyaW5nKHRyaWdnZXJpbmdPcmlnaW4pO1xuICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gPSBlc2NhcGVTdHJpbmcobG9hZGluZ09yaWdpbik7XG4gICAgICAgIC8vIGxvYWRpbmdEb2N1bWVudCdzIGhyZWZcbiAgICAgICAgLy8gVGhlIGxvYWRpbmdEb2N1bWVudCBpcyB0aGUgZG9jdW1lbnQgdGhlIGVsZW1lbnQgcmVzaWRlcywgcmVnYXJkbGVzcyBvZlxuICAgICAgICAvLyBob3cgdGhlIGxvYWQgd2FzIHRyaWdnZXJlZC5cbiAgICAgICAgY29uc3QgbG9hZGluZ0hyZWYgPSBkZXRhaWxzLmRvY3VtZW50VXJsO1xuICAgICAgICB1cGRhdGUubG9hZGluZ19ocmVmID0gZXNjYXBlU3RyaW5nKGxvYWRpbmdIcmVmKTtcbiAgICAgICAgLy8gcmVzb3VyY2VUeXBlIG9mIHRoZSByZXF1ZXN0aW5nIG5vZGUuIFRoaXMgaXMgc2V0IGJ5IHRoZSB0eXBlIG9mXG4gICAgICAgIC8vIG5vZGUgbWFraW5nIHRoZSByZXF1ZXN0IChpLmUuIGFuIDxpbWcgc3JjPS4uLj4gbm9kZSB3aWxsIHNldCB0byB0eXBlIFwiaW1hZ2VcIikuXG4gICAgICAgIC8vIERvY3VtZW50YXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3dlYlJlcXVlc3QvUmVzb3VyY2VUeXBlXG4gICAgICAgIHVwZGF0ZS5yZXNvdXJjZV90eXBlID0gZGV0YWlscy50eXBlO1xuICAgICAgICAvKlxuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIGNvbnN0IFRoaXJkUGFydHlVdGlsID0gQ2NbXCJAbW96aWxsYS5vcmcvdGhpcmRwYXJ0eXV0aWw7MVwiXS5nZXRTZXJ2aWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENpLm1veklUaGlyZFBhcnR5VXRpbCk7XG4gICAgICAgIC8vIERvIHRoaXJkLXBhcnR5IGNoZWNrc1xuICAgICAgICAvLyBUaGVzZSBzcGVjaWZpYyBjaGVja3MgYXJlIGRvbmUgYmVjYXVzZSBpdCdzIHdoYXQncyB1c2VkIGluIFRyYWNraW5nIFByb3RlY3Rpb25cbiAgICAgICAgLy8gU2VlOiBodHRwOi8vc2VhcmNoZm94Lm9yZy9tb3ppbGxhLWNlbnRyYWwvc291cmNlL25ldHdlcmsvYmFzZS9uc0NoYW5uZWxDbGFzc2lmaWVyLmNwcCMxMDdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBpc1RoaXJkUGFydHlDaGFubmVsID0gVGhpcmRQYXJ0eVV0aWwuaXNUaGlyZFBhcnR5Q2hhbm5lbChkZXRhaWxzKTtcbiAgICAgICAgICBjb25zdCB0b3BXaW5kb3cgPSBUaGlyZFBhcnR5VXRpbC5nZXRUb3BXaW5kb3dGb3JDaGFubmVsKGRldGFpbHMpO1xuICAgICAgICAgIGNvbnN0IHRvcFVSSSA9IFRoaXJkUGFydHlVdGlsLmdldFVSSUZyb21XaW5kb3codG9wV2luZG93KTtcbiAgICAgICAgICBpZiAodG9wVVJJKSB7XG4gICAgICAgICAgICBjb25zdCB0b3BVcmwgPSB0b3BVUkkuc3BlYztcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWxVUkkgPSBkZXRhaWxzLlVSSTtcbiAgICAgICAgICAgIGNvbnN0IGlzVGhpcmRQYXJ0eVRvVG9wV2luZG93ID0gVGhpcmRQYXJ0eVV0aWwuaXNUaGlyZFBhcnR5VVJJKFxuICAgICAgICAgICAgICBjaGFubmVsVVJJLFxuICAgICAgICAgICAgICB0b3BVUkksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdXBkYXRlLmlzX3RoaXJkX3BhcnR5X3RvX3RvcF93aW5kb3cgPSBpc1RoaXJkUGFydHlUb1RvcFdpbmRvdztcbiAgICAgICAgICAgIHVwZGF0ZS5pc190aGlyZF9wYXJ0eV9jaGFubmVsID0gaXNUaGlyZFBhcnR5Q2hhbm5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGFuRXJyb3IpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb25zIGV4cGVjdGVkIGZvciBjaGFubmVscyB0cmlnZ2VyZWQgb3IgbG9hZGluZyBpbiBhXG4gICAgICAgICAgLy8gTnVsbFByaW5jaXBhbCBvciBTeXN0ZW1QcmluY2lwYWwuIFRoZXkgYXJlIGFsc28gZXhwZWN0ZWQgZm9yIGZhdmljb25cbiAgICAgICAgICAvLyBsb2Fkcywgd2hpY2ggd2UgYXR0ZW1wdCB0byBmaWx0ZXIuIERlcGVuZGluZyBvbiB0aGUgbmFtaW5nLCBzb21lIGZhdmljb25zXG4gICAgICAgICAgLy8gbWF5IGNvbnRpbnVlIHRvIGxlYWQgdG8gZXJyb3IgbG9ncy5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB1cGRhdGUudHJpZ2dlcmluZ19vcmlnaW4gIT09IFwiW1N5c3RlbSBQcmluY2lwYWxdXCIgJiZcbiAgICAgICAgICAgIHVwZGF0ZS50cmlnZ2VyaW5nX29yaWdpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gIT09IFwiW1N5c3RlbSBQcmluY2lwYWxdXCIgJiZcbiAgICAgICAgICAgIHVwZGF0ZS5sb2FkaW5nX29yaWdpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAhdXBkYXRlLnVybC5lbmRzV2l0aChcImljb1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgIFwiRXJyb3Igd2hpbGUgcmV0cmlldmluZyBhZGRpdGlvbmFsIGNoYW5uZWwgaW5mb3JtYXRpb24gZm9yIFVSTDogXCIgK1xuICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgdXBkYXRlLnVybCArXG4gICAgICAgICAgICAgIFwiXFxuIEVycm9yIHRleHQ6XCIgK1xuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhbkVycm9yKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICovXG4gICAgICAgIHVwZGF0ZS50b3BfbGV2ZWxfdXJsID0gZXNjYXBlVXJsKHRoaXMuZ2V0RG9jdW1lbnRVcmxGb3JSZXF1ZXN0KGRldGFpbHMpKTtcbiAgICAgICAgdXBkYXRlLnBhcmVudF9mcmFtZV9pZCA9IGRldGFpbHMucGFyZW50RnJhbWVJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2FuY2VzdG9ycyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkZXRhaWxzLmZyYW1lQW5jZXN0b3JzKSk7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3JlcXVlc3RzXCIsIHVwZGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvZGUgdGFrZW4gYW5kIGFkYXB0ZWQgZnJvbVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9FRkZvcmcvcHJpdmFjeWJhZGdlci9wdWxsLzIxOTgvZmlsZXNcbiAgICAgKlxuICAgICAqIEdldHMgdGhlIFVSTCBmb3IgYSBnaXZlbiByZXF1ZXN0J3MgdG9wLWxldmVsIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogVGhlIHJlcXVlc3QncyBkb2N1bWVudCBtYXkgYmUgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgdG9wLWxldmVsIGRvY3VtZW50XG4gICAgICogbG9hZGVkIGluIHRhYiBhcyByZXF1ZXN0cyBjYW4gY29tZSBvdXQgb2Ygb3JkZXI6XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYlJlcXVlc3RPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzfSBkZXRhaWxzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHs/U3RyaW5nfSB0aGUgVVJMIGZvciB0aGUgcmVxdWVzdCdzIHRvcC1sZXZlbCBkb2N1bWVudFxuICAgICAqL1xuICAgIGdldERvY3VtZW50VXJsRm9yUmVxdWVzdChkZXRhaWxzKSB7XG4gICAgICAgIGxldCB1cmwgPSBcIlwiO1xuICAgICAgICBpZiAoZGV0YWlscy50eXBlID09PSBcIm1haW5fZnJhbWVcIikge1xuICAgICAgICAgICAgLy8gVXJsIG9mIHRoZSB0b3AtbGV2ZWwgZG9jdW1lbnQgaXRzZWxmLlxuICAgICAgICAgICAgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcImZyYW1lQW5jZXN0b3JzXCIpKSB7XG4gICAgICAgICAgICAvLyBJbiBjYXNlIG9mIG5lc3RlZCBmcmFtZXMsIHJldHJpZXZlIHVybCBmcm9tIHRvcC1tb3N0IGFuY2VzdG9yLlxuICAgICAgICAgICAgLy8gSWYgZnJhbWVBbmNlc3RvcnMgPT0gW10sIHJlcXVlc3QgY29tZXMgZnJvbSB0aGUgdG9wLWxldmVsLWRvY3VtZW50LlxuICAgICAgICAgICAgdXJsID0gZGV0YWlscy5mcmFtZUFuY2VzdG9ycy5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IGRldGFpbHMuZnJhbWVBbmNlc3RvcnNbZGV0YWlscy5mcmFtZUFuY2VzdG9ycy5sZW5ndGggLSAxXS51cmxcbiAgICAgICAgICAgICAgICA6IGRldGFpbHMuZG9jdW1lbnRVcmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0eXBlICE9ICdtYWluX2ZyYW1lJyBhbmQgZnJhbWVBbmNlc3RvcnMgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSBzZXJ2aWNlIHdvcmtlcnM6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0NzA1MzcjYzEzXG4gICAgICAgICAgICB1cmwgPSBkZXRhaWxzLmRvY3VtZW50VXJsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIGFzeW5jIG9uQmVmb3JlUmVkaXJlY3RIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQmVmb3JlUmVkaXJlY3RIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIC8vIFNhdmUgSFRUUCByZWRpcmVjdCBldmVudHNcbiAgICAgICAgLy8gRXZlbnRzIGFyZSBzYXZlZCB0byB0aGUgYGh0dHBfcmVkaXJlY3RzYCB0YWJsZVxuICAgICAgICAvKlxuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIC8vIEV2ZW50cyBhcmUgc2F2ZWQgdG8gdGhlIGBodHRwX3JlZGlyZWN0c2AgdGFibGUsIGFuZCBtYXAgdGhlIG9sZFxuICAgICAgICAvLyByZXF1ZXN0L3Jlc3BvbnNlIGNoYW5uZWwgaWQgdG8gdGhlIG5ldyByZXF1ZXN0L3Jlc3BvbnNlIGNoYW5uZWwgaWQuXG4gICAgICAgIC8vIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTEyNDA2MjdcbiAgICAgICAgY29uc3Qgb2xkTm90aWZpY2F0aW9ucyA9IGRldGFpbHMubm90aWZpY2F0aW9uQ2FsbGJhY2tzO1xuICAgICAgICBsZXQgb2xkRXZlbnRTaW5rID0gbnVsbDtcbiAgICAgICAgZGV0YWlscy5ub3RpZmljYXRpb25DYWxsYmFja3MgPSB7XG4gICAgICAgICAgUXVlcnlJbnRlcmZhY2U6IFhQQ09NVXRpbHMuZ2VuZXJhdGVRSShbXG4gICAgICAgICAgICBDaS5uc0lJbnRlcmZhY2VSZXF1ZXN0b3IsXG4gICAgICAgICAgICBDaS5uc0lDaGFubmVsRXZlbnRTaW5rLFxuICAgICAgICAgIF0pLFxuICAgIFxuICAgICAgICAgIGdldEludGVyZmFjZShpaWQpIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gbnNJQ2hhbm5lbEV2ZW50U2luayxcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb2xkIGNhbGxiYWNrcyBmb3IgYW55IG90aGVyIGludGVyZmFjZSByZXF1ZXN0cy5cbiAgICAgICAgICAgIGlmIChpaWQuZXF1YWxzKENpLm5zSUNoYW5uZWxFdmVudFNpbmspKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkRXZlbnRTaW5rID0gb2xkTm90aWZpY2F0aW9ucy5RdWVyeUludGVyZmFjZShpaWQpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChhbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIkVycm9yIGR1cmluZyBjYWxsIHRvIGN1c3RvbSBub3RpZmljYXRpb25DYWxsYmFja3M6OmdldEludGVyZmFjZS5cIiArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGFuRXJyb3IpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAob2xkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICByZXR1cm4gb2xkTm90aWZpY2F0aW9ucy5nZXRJbnRlcmZhY2UoaWlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IENyLk5TX0VSUk9SX05PX0lOVEVSRkFDRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgIFxuICAgICAgICAgIGFzeW5jT25DaGFubmVsUmVkaXJlY3Qob2xkQ2hhbm5lbCwgbmV3Q2hhbm5lbCwgZmxhZ3MsIGNhbGxiYWNrKSB7XG4gICAgXG4gICAgICAgICAgICBuZXdDaGFubmVsLlF1ZXJ5SW50ZXJmYWNlKENpLm5zSUh0dHBDaGFubmVsKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGh0dHBSZWRpcmVjdDogSHR0cFJlZGlyZWN0ID0ge1xuICAgICAgICAgICAgICBicm93c2VyX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgICBvbGRfcmVxdWVzdF9pZDogb2xkQ2hhbm5lbC5jaGFubmVsSWQsXG4gICAgICAgICAgICAgIG5ld19yZXF1ZXN0X2lkOiBuZXdDaGFubmVsLmNoYW5uZWxJZCxcbiAgICAgICAgICAgICAgdGltZV9zdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3JlZGlyZWN0c1wiLCBodHRwUmVkaXJlY3QpO1xuICAgIFxuICAgICAgICAgICAgaWYgKG9sZEV2ZW50U2luaykge1xuICAgICAgICAgICAgICBvbGRFdmVudFNpbmsuYXN5bmNPbkNoYW5uZWxSZWRpcmVjdChcbiAgICAgICAgICAgICAgICBvbGRDaGFubmVsLFxuICAgICAgICAgICAgICAgIG5ld0NoYW5uZWwsXG4gICAgICAgICAgICAgICAgZmxhZ3MsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjay5vblJlZGlyZWN0VmVyaWZ5Q2FsbGJhY2soQ3IuTlNfT0spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gZGV0YWlscy5zdGF0dXNDb2RlO1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1c1RleHQgPSBkZXRhaWxzLnN0YXR1c0xpbmU7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgaHR0cFJlZGlyZWN0ID0ge1xuICAgICAgICAgICAgaW5jb2duaXRvOiBib29sVG9JbnQodGFiLmluY29nbml0byksXG4gICAgICAgICAgICBicm93c2VyX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy51cmwpLFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfaWQ6IGRldGFpbHMucmVxdWVzdElkLFxuICAgICAgICAgICAgbmV3X3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy5yZWRpcmVjdFVybCksXG4gICAgICAgICAgICBuZXdfcmVxdWVzdF9pZDogbnVsbCxcbiAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgZXZlbnRfb3JkaW5hbDogZXZlbnRPcmRpbmFsLFxuICAgICAgICAgICAgd2luZG93X2lkOiB0YWIud2luZG93SWQsXG4gICAgICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgICAgICBmcmFtZV9pZDogZGV0YWlscy5mcmFtZUlkLFxuICAgICAgICAgICAgcmVzcG9uc2Vfc3RhdHVzOiByZXNwb25zZVN0YXR1cyxcbiAgICAgICAgICAgIHJlc3BvbnNlX3N0YXR1c190ZXh0OiBlc2NhcGVTdHJpbmcocmVzcG9uc2VTdGF0dXNUZXh0KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuanNvbmlmeUhlYWRlcnMoZGV0YWlscy5yZXNwb25zZUhlYWRlcnMpLmhlYWRlcnMsXG4gICAgICAgICAgICB0aW1lX3N0YW1wOiBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVkaXJlY3RzXCIsIGh0dHBSZWRpcmVjdCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogSFRUUCBSZXNwb25zZSBIYW5kbGVycyBhbmQgSGVscGVyIEZ1bmN0aW9uc1xuICAgICAqL1xuICAgIGFzeW5jIGxvZ1dpdGhSZXNwb25zZUJvZHkoZGV0YWlscywgdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQm9keUxpc3RlbmVyID0gcGVuZGluZ1Jlc3BvbnNlLnJlc3BvbnNlQm9keUxpc3RlbmVyO1xuICAgICAgICAgICAgY29uc3QgcmVzcEJvZHkgPSBhd2FpdCByZXNwb25zZUJvZHlMaXN0ZW5lci5nZXRSZXNwb25zZUJvZHkoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIYXNoID0gYXdhaXQgcmVzcG9uc2VCb2R5TGlzdGVuZXIuZ2V0Q29udGVudEhhc2goKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVDb250ZW50KHJlc3BCb2R5LCBlc2NhcGVTdHJpbmcoY29udGVudEhhc2gpKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBjb250ZW50SGFzaDtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgICAgICBkYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgIFwiVW5hYmxlIHRvIHJldHJpZXZlIHJlc3BvbnNlIGJvZHkuXCIgKyBKU09OLnN0cmluZ2lmeShhUmVhc29uKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1cGRhdGUuY29udGVudF9oYXNoID0gXCI8ZXJyb3I+XCI7XG4gICAgICAgICAgICBkYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJVbmFibGUgdG8gcmV0cmlldmUgcmVzcG9uc2UgYm9keS5cIiArXG4gICAgICAgICAgICAgICAgXCJMaWtlbHkgY2F1c2VkIGJ5IGEgcHJvZ3JhbW1pbmcgZXJyb3IuIEVycm9yIE1lc3NhZ2U6XCIgK1xuICAgICAgICAgICAgICAgIGVyci5uYW1lICtcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBcIjxlcnJvcj5cIjtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEluc3RydW1lbnQgSFRUUCByZXNwb25zZXNcbiAgICBhc3luYyBvbkNvbXBsZXRlZEhhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgZXZlbnRPcmRpbmFsLCBzYXZlQ29udGVudCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQ29tcGxldGVkSGFuZGxlciAocHJldmlvdXNseSBodHRwUmVxdWVzdEhhbmRsZXIpXCIsXG4gICAgICAgICAgZGV0YWlscyxcbiAgICAgICAgICBjcmF3bElELFxuICAgICAgICAgIHNhdmVDb250ZW50LFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgICAgICBjb25zdCB0YWIgPSBkZXRhaWxzLnRhYklkID4gLTFcbiAgICAgICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICAgICAgOiB7IHdpbmRvd0lkOiB1bmRlZmluZWQsIGluY29nbml0bzogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pO1xuICAgICAgICB1cGRhdGUuYnJvd3Nlcl9pZCA9IGNyYXdsSUQ7XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gZXZlbnRPcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gdGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gZGV0YWlscy50YWJJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gZGV0YWlscy5mcmFtZUlkO1xuICAgICAgICAvLyByZXF1ZXN0SWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpbmsgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgICAgICB1cGRhdGUucmVxdWVzdF9pZCA9IE51bWJlcihkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgIGNvbnN0IGlzQ2FjaGVkID0gZGV0YWlscy5mcm9tQ2FjaGU7XG4gICAgICAgIHVwZGF0ZS5pc19jYWNoZWQgPSBib29sVG9JbnQoaXNDYWNoZWQpO1xuICAgICAgICBjb25zdCB1cmwgPSBkZXRhaWxzLnVybDtcbiAgICAgICAgdXBkYXRlLnVybCA9IGVzY2FwZVVybCh1cmwpO1xuICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gZGV0YWlscy5tZXRob2Q7XG4gICAgICAgIHVwZGF0ZS5tZXRob2QgPSBlc2NhcGVTdHJpbmcocmVxdWVzdE1ldGhvZCk7XG4gICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgLy8gKHJlcXVlc3QgaGVhZGVycyBhcmUgbm90IGF2YWlsYWJsZSBpbiBodHRwIHJlc3BvbnNlIGV2ZW50IGxpc3RlbmVyIG9iamVjdCxcbiAgICAgICAgLy8gYnV0IHRoZSByZWZlcnJlciBwcm9wZXJ0eSBvZiB0aGUgY29ycmVzcG9uZGluZyByZXF1ZXN0IGNvdWxkIGJlIHF1ZXJpZWQpXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGxldCByZWZlcnJlciA9IFwiXCI7XG4gICAgICAgIC8vIGlmIChkZXRhaWxzLnJlZmVycmVyKSB7XG4gICAgICAgIC8vICAgcmVmZXJyZXIgPSBkZXRhaWxzLnJlZmVycmVyLnNwZWM7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdXBkYXRlLnJlZmVycmVyID0gZXNjYXBlU3RyaW5nKHJlZmVycmVyKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VTdGF0dXMgPSBkZXRhaWxzLnN0YXR1c0NvZGU7XG4gICAgICAgIHVwZGF0ZS5yZXNwb25zZV9zdGF0dXMgPSByZXNwb25zZVN0YXR1cztcbiAgICAgICAgY29uc3QgcmVzcG9uc2VTdGF0dXNUZXh0ID0gZGV0YWlscy5zdGF0dXNMaW5lO1xuICAgICAgICB1cGRhdGUucmVzcG9uc2Vfc3RhdHVzX3RleHQgPSBlc2NhcGVTdHJpbmcocmVzcG9uc2VTdGF0dXNUZXh0KTtcbiAgICAgICAgY29uc3QgY3VycmVudF90aW1lID0gbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApO1xuICAgICAgICB1cGRhdGUudGltZV9zdGFtcCA9IGN1cnJlbnRfdGltZS50b0lTT1N0cmluZygpO1xuICAgICAgICBjb25zdCBwYXJzZWRIZWFkZXJzID0gdGhpcy5qc29uaWZ5SGVhZGVycyhkZXRhaWxzLnJlc3BvbnNlSGVhZGVycyk7XG4gICAgICAgIHVwZGF0ZS5oZWFkZXJzID0gcGFyc2VkSGVhZGVycy5oZWFkZXJzO1xuICAgICAgICB1cGRhdGUubG9jYXRpb24gPSBwYXJzZWRIZWFkZXJzLmxvY2F0aW9uO1xuICAgICAgICBpZiAodGhpcy5zaG91bGRTYXZlQ29udGVudChzYXZlQ29udGVudCwgZGV0YWlscy50eXBlKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dXaXRoUmVzcG9uc2VCb2R5KGRldGFpbHMsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXNwb25zZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBqc29uaWZ5SGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdEhlYWRlcnMgPSBbXTtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJcIjtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMubWFwKChyZXNwb25zZUhlYWRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHJlc3BvbnNlSGVhZGVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcobmFtZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0SGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyczogSlNPTi5zdHJpbmdpZnkocmVzdWx0SGVhZGVycyksXG4gICAgICAgICAgICBsb2NhdGlvbjogZXNjYXBlU3RyaW5nKGxvY2F0aW9uKSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0MxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZhSFIwY0MxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4alFVRmpMRVZCUVhGQ0xFMUJRVTBzZVVKQlFYbENMRU5CUVVNN1FVRkROVVVzVDBGQlR5eEZRVUZGTEdOQlFXTXNSVUZCUlN4TlFVRk5MSGRDUVVGM1FpeERRVUZETzBGQlEzaEVMRTlCUVU4c1JVRkJSU3hsUVVGbExFVkJRVVVzVFVGQlRTeDVRa0ZCZVVJc1EwRkJRenRCUVVNeFJDeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeHhRa0ZCY1VJc1EwRkJRenRCUVdWNlJUczdPenM3TzBkQlRVYzdRVUZGU0N4TlFVRk5MRkZCUVZFc1IwRkJiVUk3U1VGREwwSXNVVUZCVVR0SlFVTlNMRmxCUVZrN1NVRkRXaXhOUVVGTk8wbEJRMDRzVDBGQlR6dEpRVU5RTEZWQlFWVTdTVUZEVml4WlFVRlpPMGxCUTFvc1QwRkJUenRKUVVOUUxGRkJRVkU3U1VGRFVpeHRRa0ZCYlVJN1NVRkRia0lzVFVGQlRUdEpRVU5PTEZGQlFWRTdTVUZEVWl4aFFVRmhPMGxCUTJJc1dVRkJXVHRKUVVOYUxGZEJRVmM3U1VGRFdDeGpRVUZqTzBsQlEyUXNWMEZCVnp0SlFVTllMRk5CUVZNN1NVRkRWQ3huUWtGQlowSTdTVUZEYUVJc1RVRkJUVHRKUVVOT0xFOUJRVTg3UTBGRFVpeERRVUZETzBGQlJVWXNUMEZCVHl4RlFVRkZMRkZCUVZFc1JVRkJSU3hEUVVGRE8wRkJSWEJDTEUxQlFVMHNUMEZCVHl4alFVRmpPMGxCUTFJc1dVRkJXU3hEUVVGRE8wbEJRM1JDTEdWQlFXVXNSMEZGYmtJc1JVRkJSU3hEUVVGRE8wbEJRME1zWjBKQlFXZENMRWRCUlhCQ0xFVkJRVVVzUTBGQlF6dEpRVU5ETEhWQ1FVRjFRaXhEUVVGRE8wbEJRM2hDTERKQ1FVRXlRaXhEUVVGRE8wbEJRelZDTEhkQ1FVRjNRaXhEUVVGRE8wbEJRM3BDTEcxQ1FVRnRRaXhEUVVGRE8wbEJSVFZDTEZsQlFWa3NXVUZCV1R0UlFVTjBRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEZsQlFWa3NRMEZCUXp0SlFVTnVReXhEUVVGRE8wbEJSVTBzUjBGQlJ5eERRVUZETEU5QlFVOHNSVUZCUlN4cFFrRkJiME03VVVGRGRFUXNUVUZCVFN4TlFVRk5MRWRCUVd0Q0xFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNXVUZCV1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeERRVUZETzFGQlJYaEZMRTFCUVUwc2VVSkJRWGxDTEVkQlFVY3NRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSVHRaUVVNMVF5eFBRVUZQTEVOQlEwd3NUMEZCVHl4RFFVRkRMRk5CUVZNc1NVRkJTU3hQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEU5QlFVOHNRMEZCUXl4clFrRkJhMElzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVTjRSU3hEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETzFGQlJVWTdPMWRCUlVjN1VVRkZTQ3hKUVVGSkxFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc1EwRkROMElzVDBGQk9FTXNSVUZET1VNc1JVRkJSVHRaUVVOR0xFMUJRVTBzSzBKQlFTdENMRWRCUVhGQ0xFVkJRVVVzUTBGQlF6dFpRVU0zUkN4eFEwRkJjVU03V1VGRGNrTXNTVUZCU1N4NVFrRkJlVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRkRU1zVDBGQlR5d3JRa0ZCSzBJc1EwRkJRenRoUVVONFF6dFpRVU5FTEUxQlFVMHNZMEZCWXl4SFFVRkhMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03V1VGRGFrVXNZMEZCWXl4RFFVRkRMR3REUVVGclF5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUXpORUxFMUJRVTBzWlVGQlpTeEhRVUZITEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRia1VzWlVGQlpTeERRVUZETEd0RFFVRnJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6VkVMRWxCUVVrc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHRuUWtGRE0wUXNaVUZCWlN4RFFVRkRMQ3RDUVVFclFpeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMkZCUXpGRU8xbEJRMFFzVDBGQlR5d3JRa0ZCSzBJc1EwRkJRenRSUVVONlF5eERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExHVkJRV1VzUTBGQlF5eFhRVUZYTEVOQlF6VkRMRWxCUVVrc1EwRkJReXgxUWtGQmRVSXNSVUZETlVJc1RVRkJUU3hGUVVOT0xFbEJRVWtzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhwUWtGQmFVSXNRMEZCUXp0WlFVTTFReXhEUVVGRExFTkJRVU1zUTBGQlF5eGhRVUZoTEVWQlFVVXNWVUZCVlN4RFFVRkRPMWxCUXpkQ0xFTkJRVU1zUTBGQlF5eERRVUZETEdGQlFXRXNRMEZCUXl4RFFVTndRaXhEUVVGRE8xRkJSVVlzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVTdXVUZETjBNc2NVTkJRWEZETzFsQlEzSkRMRWxCUVVrc2VVSkJRWGxDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1owSkJRM1JETEU5QlFVODdZVUZEVWp0WlFVTkVMRTFCUVUwc1kwRkJZeXhIUVVGSExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdXVUZEYWtVc1kwRkJZeXhEUVVGRExITkRRVUZ6UXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJReTlFTEVsQlFVa3NRMEZCUXl3d1FrRkJNRUlzUTBGRE4wSXNUMEZCVHl4RlFVTlFMRTlCUVU4c1JVRkRVQ3gxUWtGQmRVSXNSVUZCUlN4RFFVTXhRaXhEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4WFFVRlhMRU5CUTJoRUxFbEJRVWtzUTBGQlF5d3lRa0ZCTWtJc1JVRkRhRU1zVFVGQlRTeEZRVU5PTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGRGJrSXNRMEZCUXp0UlFVVkdMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1JVRkJSU3hGUVVGRk8xbEJRekZETEhGRFFVRnhRenRaUVVOeVF5eEpRVUZKTEhsQ1FVRjVRaXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTjBReXhQUVVGUE8yRkJRMUk3V1VGRFJDeEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZETlVVc1EwRkJReXhEUVVGRE8xRkJRMFlzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFhRVUZYTEVOQlF6ZERMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNSVUZETjBJc1RVRkJUU3hGUVVOT0xFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkRjRUlzUTBGQlF6dFJRVVZHTEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUjBGQlJ5eERRVUZETEU5QlFVOHNSVUZCUlN4RlFVRkZPMWxCUTNKRExIRkRRVUZ4UXp0WlFVTnlReXhKUVVGSkxIbENRVUY1UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8yZENRVU4wUXl4UFFVRlBPMkZCUTFJN1dVRkRSQ3hOUVVGTkxHVkJRV1VzUjBGQlJ5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTI1RkxHVkJRV1VzUTBGQlF5dzRRa0ZCT0VJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU40UkN4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlEzSkNMRTlCUVU4c1JVRkRVQ3hQUVVGUExFVkJRMUFzZFVKQlFYVkNMRVZCUVVVc1JVRkRla0lzYVVKQlFXbENMRU5CUTJ4Q0xFTkJRVU03VVVGRFNpeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExGZEJRVmNzUTBGQlF5eFhRVUZYTEVOQlEzaERMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNSVUZEZUVJc1RVRkJUU3hGUVVOT0xFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkRjRUlzUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVFN4UFFVRlBPMUZCUTFvc1NVRkJTU3hKUVVGSkxFTkJRVU1zZFVKQlFYVkNMRVZCUVVVN1dVRkRhRU1zVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1kwRkJZeXhEUVVNdlF5eEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFTkJRemRDTEVOQlFVTTdVMEZEU0R0UlFVTkVMRWxCUVVrc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RlFVRkZPMWxCUTNCRExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zWTBGQll5eERRVU51UkN4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVOQlEycERMRU5CUVVNN1UwRkRTRHRSUVVORUxFbEJRVWtzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhGUVVGRk8xbEJRMnBETEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNZMEZCWXl4RFFVTm9SQ3hKUVVGSkxFTkJRVU1zZDBKQlFYZENMRU5CUXpsQ0xFTkJRVU03VTBGRFNEdFJRVU5FTEVsQlFVa3NTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTzFsQlF6VkNMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zVjBGQlZ5eERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0VFFVTjZSVHRKUVVOSUxFTkJRVU03U1VGRlR5eHpRa0ZCYzBJc1EwRkJReXhwUWtGQmIwTTdVVUZEYWtVc1NVRkJTU3hwUWtGQmFVSXNTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRPVUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdVMEZEWWp0UlFVTkVMRWxCUVVrc2FVSkJRV2xDTEV0QlFVc3NTMEZCU3l4RlFVRkZPMWxCUXk5Q0xFOUJRVThzUzBGQlN5eERRVUZETzFOQlEyUTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRja1VzUTBGQlF6dEpRVVZQTEhkQ1FVRjNRaXhEUVVGRExHbENRVUY1UWp0UlFVTjRSQ3hQUVVGUExHbENRVUZwUWl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVzFDTEVOQlFVTTdTVUZEZUVRc1EwRkJRenRKUVVWRU96czdPenM3VDBGTlJ6dEpRVU5MTEdsQ1FVRnBRaXhEUVVOMlFpeHBRa0ZCYjBNc1JVRkRjRU1zV1VGQk1FSTdVVUZGTVVJc1NVRkJTU3hwUWtGQmFVSXNTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRPVUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdVMEZEWWp0UlFVTkVMRWxCUVVrc2FVSkJRV2xDTEV0QlFVc3NTMEZCU3l4RlFVRkZPMWxCUXk5Q0xFOUJRVThzUzBGQlN5eERRVUZETzFOQlEyUTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETEZGQlFWRXNRMEZET1VRc1dVRkJXU3hEUVVOaUxFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVOHNhVUpCUVdsQ0xFTkJRVU1zVTBGQlV6dFJRVU5xUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eFRRVUZUTEVOQlFVTXNSVUZCUlR0WlFVTndReXhKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETEZOQlFWTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1kwRkJZeXhGUVVGRkxFTkJRVU03VTBGRGVFUTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdTVUZEZWtNc1EwRkJRenRKUVVWUExHdENRVUZyUWl4RFFVRkRMRk5CUVZNN1VVRkRiRU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eFRRVUZUTEVOQlFVTXNSVUZCUlR0WlFVTnlReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVWNzU1VGQlNTeGxRVUZsTEVWQlFVVXNRMEZCUXp0VFFVTXhSRHRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNN1NVRkZSRHM3VDBGRlJ6dEpRVVZMTEV0QlFVc3NRMEZCUXl3d1FrRkJNRUlzUTBGRGRFTXNUMEZCYTBRc1JVRkRiRVFzVDBGQlR5eEZRVU5RTEZsQlFXOUNPMUZCUlhCQ0xFMUJRVTBzUjBGQlJ5eEhRVU5RTEU5QlFVOHNRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhDTEVOQlFVTXNRMEZCUXl4TlFVRk5MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRka01zUTBGQlF5eERRVUZETEVWQlFVVXNVVUZCVVN4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzVTBGQlV5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVVc1EwRkJRenRSUVVWd1JTeE5RVUZOTEUxQlFVMHNSMEZCUnl4RlFVRnBRaXhEUVVGRE8xRkJSV3BETEUxQlFVMHNRMEZCUXl4VFFVRlRMRWRCUVVjc1UwRkJVeXhEUVVGRExFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTTFReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEU5QlFVOHNRMEZCUXp0UlFVTTFRaXhOUVVGTkxFTkJRVU1zYzBKQlFYTkNMRWRCUVVjc2IwSkJRVzlDTEVOQlFVTTdVVUZEY2tRc1RVRkJUU3hEUVVGRExHRkJRV0VzUjBGQlJ5eFpRVUZaTEVOQlFVTTdVVUZEY0VNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTJoRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVkQlFVY3NUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJRenRSUVVNNVFpeE5RVUZOTEVOQlFVTXNVVUZCVVN4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU03VVVGRmJFTXNiVVpCUVcxR08xRkJRMjVHTEUxQlFVMHNRMEZCUXl4VlFVRlZMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVVTVReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMUZCUTNoQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSVFZDTEUxQlFVMHNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhaUVVGWkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTTdVVUZGTlVNc1RVRkJUU3haUVVGWkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMnBFTEUxQlFVMHNRMEZCUXl4VlFVRlZMRWRCUVVjc1dVRkJXU3hEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFGQlJTOURMRWxCUVVrc1dVRkJXU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU4wUWl4SlFVRkpMRkZCUVZFc1IwRkJSeXhGUVVGRkxFTkJRVU03VVVGRGJFSXNUVUZCVFN4UFFVRlBMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMjVDTEVsQlFVa3NUVUZCVFN4SFFVRkhMRXRCUVVzc1EwRkJRenRSUVVOdVFpeEpRVUZKTEU5QlFVOHNRMEZCUXl4alFVRmpMRVZCUVVVN1dVRkRNVUlzVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhoUVVGaExFVkJRVVVzUlVGQlJUdG5Ra0ZETTBNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeExRVUZMTEVWQlFVVXNSMEZCUnl4aFFVRmhMRU5CUVVNN1owSkJRM1JETEUxQlFVMHNWMEZCVnl4SFFVRkhMRVZCUVVVc1EwRkJRenRuUWtGRGRrSXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRja01zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEZEVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzU1VGQlNTeEpRVUZKTEV0QlFVc3NZMEZCWXl4RlFVRkZPMjlDUVVNelFpeFpRVUZaTEVkQlFVY3NTMEZCU3l4RFFVRkRPMjlDUVVOeVFpeEpRVUZKTEZsQlFWa3NRMEZCUXl4UFFVRlBMRU5CUVVNc01FSkJRVEJDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1JVRkJSVHQzUWtGRE0wUXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenR4UWtGRFpqdHBRa0ZEUmp0blFrRkRSQ3hKUVVGSkxFbEJRVWtzUzBGQlN5eFRRVUZUTEVWQlFVVTdiMEpCUTNSQ0xGRkJRVkVzUjBGQlJ5eExRVUZMTEVOQlFVTTdhVUpCUTJ4Q08xbEJRMGdzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEU2p0UlFVVkVMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMUZCUlhwRExFbEJRVWtzWVVGQllTeExRVUZMTEUxQlFVMHNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhwUTBGQmFVTXNSVUZCUlR0WlFVTjZSU3hOUVVGTkxHTkJRV01zUjBGQlJ5eEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNZMEZCWXl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdaMEpCUTJJc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFJRVUZSTEVOQlEzaENMSEZIUVVGeFJ5eERRVU4wUnl4RFFVRkRPMkZCUTBnN2FVSkJRVTA3WjBKQlEwd3NUVUZCVFN3eVFrRkJNa0lzUjBGREwwSXNUVUZCVFN4alFVRmpMRU5CUVVNc01rSkJRVEpDTEVOQlFVTTdaMEpCUTI1RUxFMUJRVTBzVjBGQlZ5eEhRVUZITERKQ1FVRXlRaXhEUVVGRExGZEJRVmNzUTBGQlF6dG5Ra0ZGTlVRc1NVRkJTU3hYUVVGWExFVkJRVVU3YjBKQlEyWXNUVUZCVFN4VlFVRlZMRWRCUVVjc1NVRkJTU3hqUVVGakxFTkJRMjVETERKQ1FVRXlRaXhGUVVNelFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVTnNRaXhEUVVGRE8yOUNRVU5HTEUxQlFVMHNUMEZCVHl4SFFVRnpRaXhWUVVGVkxFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1EwRkJRenR2UWtGRmFrVXNaMFJCUVdkRU8yOUNRVU5vUkN4SlFVRkpMR05CUVdNc1NVRkJTU3hQUVVGUExFVkJRVVU3ZDBKQlF6ZENMREJHUVVFd1JqdDNRa0ZETVVZc2JVZEJRVzFITzNkQ1FVTnVSeXhOUVVGTkxHTkJRV01zUjBGQlJ6czBRa0ZEY2tJc1kwRkJZenMwUWtGRFpDeHhRa0ZCY1VJN05FSkJRM0pDTEdkQ1FVRm5RanQ1UWtGRGFrSXNRMEZCUXp0M1FrRkRSaXhMUVVGTExFMUJRVTBzU1VGQlNTeEpRVUZKTEU5QlFVOHNRMEZCUXl4WlFVRlpMRVZCUVVVN05FSkJRM1pETEVsQlFVa3NZMEZCWXl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdG5RMEZEYWtNc1RVRkJUU3hYUVVGWExFZEJRVWNzUlVGQlJTeERRVUZETzJkRFFVTjJRaXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8yZERRVU55UXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFBRVUZQTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dG5RMEZETTBRc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXpzMlFrRkRNMEk3ZVVKQlEwWTdjVUpCUTBZN2IwSkJRMFFzSzBaQlFTdEdPMjlDUVVNdlJpeEpRVUZKTEZkQlFWY3NTVUZCU1N4UFFVRlBMRVZCUVVVN2QwSkJRekZDTEUxQlFVMHNRMEZCUXl4VFFVRlRMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dHhRa0ZEZEVNN2IwSkJRMFFzU1VGQlNTeGxRVUZsTEVsQlFVa3NUMEZCVHl4RlFVRkZPM2RDUVVNNVFpeE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhoUVVGaExFTkJRVU03Y1VKQlF6bERPMmxDUVVOR08yRkJRMFk3VTBGRFJqdFJRVVZFTEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVVjZReXhsUVVGbE8xRkJRMllzVFVGQlRTeExRVUZMTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1MwRkJTeXhuUWtGQlowSXNRMEZCUXp0UlFVTm9SQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRSUVVWcVF5dzJRMEZCTmtNN1VVRkROME1zU1VGQlNTeG5Ra0ZCWjBJc1EwRkJRenRSUVVOeVFpeEpRVUZKTEdGQlFXRXNRMEZCUXp0UlFVTnNRaXhKUVVGSkxFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVTdXVUZEY2tJc1RVRkJUU3hsUVVGbExFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMjVFTEdkQ1FVRm5RaXhIUVVGSExHVkJRV1VzUTBGQlF5eE5RVUZOTEVOQlFVTTdVMEZETTBNN1VVRkRSQ3hKUVVGSkxFOUJRVThzUTBGQlF5eFhRVUZYTEVWQlFVVTdXVUZEZGtJc1RVRkJUU3hwUWtGQmFVSXNSMEZCUnl4SlFVRkpMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdXVUZEZGtRc1lVRkJZU3hIUVVGSExHbENRVUZwUWl4RFFVRkRMRTFCUVUwc1EwRkJRenRUUVVNeFF6dFJRVU5FTEUxQlFVMHNRMEZCUXl4cFFrRkJhVUlzUjBGQlJ5eFpRVUZaTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dFJRVU14UkN4TlFVRk5MRU5CUVVNc1kwRkJZeXhIUVVGSExGbEJRVmtzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXp0UlFVVndSQ3g1UWtGQmVVSTdVVUZEZWtJc2VVVkJRWGxGTzFGQlEzcEZMRGhDUVVFNFFqdFJRVU01UWl4TlFVRk5MRmRCUVZjc1IwRkJSeXhQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETzFGQlEzaERMRTFCUVUwc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMUZCUldoRUxHdEZRVUZyUlR0UlFVTnNSU3hwUmtGQmFVWTdVVUZEYWtZc2FVSkJRV2xDTzFGQlEycENMSEZIUVVGeFJ6dFJRVU55Unl4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTTdVVUZGY0VNN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRWUVRCRFJUdFJRVU5HTEUxQlFVMHNRMEZCUXl4aFFVRmhMRWRCUVVjc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcEZMRTFCUVUwc1EwRkJReXhsUVVGbExFZEJRVWNzVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUXp0UlFVTXZReXhOUVVGTkxFTkJRVU1zWlVGQlpTeEhRVUZITEZsQlFWa3NRMEZEYmtNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUTNaRExFTkJRVU03VVVGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhsUVVGbExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdTVUZEZUVRc1EwRkJRenRKUVVWRU96czdPenM3T3pzN096czdUMEZaUnp0SlFVTkxMSGRDUVVGM1FpeERRVU01UWl4UFFVRnJSRHRSUVVWc1JDeEpRVUZKTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkZZaXhKUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEV0QlFVc3NXVUZCV1N4RlFVRkZPMWxCUTJwRExIZERRVUYzUXp0WlFVTjRReXhIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0VFFVTnVRanRoUVVGTkxFbEJRVWtzVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eEZRVUZGTzFsQlEyNUVMR2xGUVVGcFJUdFpRVU5xUlN4elJVRkJjMFU3V1VGRGRFVXNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zVFVGQlRUdG5Ra0ZEYWtNc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnp0blFrRkRMMFFzUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNN1UwRkRla0k3WVVGQlRUdFpRVU5NTEhWRVFVRjFSRHRaUVVOMlJDeDNSa0ZCZDBZN1dVRkRlRVlzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNN1UwRkRNMEk3VVVGRFJDeFBRVUZQTEVkQlFVY3NRMEZCUXp0SlFVTmlMRU5CUVVNN1NVRkZUeXhMUVVGTExFTkJRVU1zZFVKQlFYVkNMRU5CUTI1RExFOUJRU3RETEVWQlF5OURMRTlCUVU4c1JVRkRVQ3haUVVGdlFqdFJRVVZ3UWpzN096czdPMVZCVFVVN1VVRkZSaXcwUWtGQk5FSTdVVUZETlVJc2FVUkJRV2xFTzFGQlJXcEVPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0VlFUSkVSVHRSUVVWR0xFMUJRVTBzWTBGQll5eEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRNVU1zVFVGQlRTeHJRa0ZCYTBJc1IwRkJSeXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETzFGQlJUbERMRTFCUVUwc1IwRkJSeXhIUVVOUUxFOUJRVThzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTJoQ0xFTkJRVU1zUTBGQlF5eE5RVUZOTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEZGtNc1EwRkJReXhEUVVGRExFVkJRVVVzVVVGQlVTeEZRVUZGTEZOQlFWTXNSVUZCUlN4VFFVRlRMRVZCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU03VVVGRGNFUXNUVUZCVFN4WlFVRlpMRWRCUVdsQ08xbEJRMnBETEZOQlFWTXNSVUZCUlN4VFFVRlRMRU5CUVVNc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF6dFpRVU51UXl4VlFVRlZMRVZCUVVVc1QwRkJUenRaUVVOdVFpeGxRVUZsTEVWQlFVVXNVMEZCVXl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU03V1VGRGRrTXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJReXhUUVVGVE8xbEJRMnBETEdWQlFXVXNSVUZCUlN4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF6dFpRVU12UXl4alFVRmpMRVZCUVVVc1NVRkJTVHRaUVVOd1FpeHpRa0ZCYzBJc1JVRkJSU3h2UWtGQmIwSTdXVUZETlVNc1lVRkJZU3hGUVVGRkxGbEJRVms3V1VGRE0wSXNVMEZCVXl4RlFVRkZMRWRCUVVjc1EwRkJReXhSUVVGUk8xbEJRM1pDTEUxQlFVMHNSVUZCUlN4UFFVRlBMRU5CUVVNc1MwRkJTenRaUVVOeVFpeFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRMRTlCUVU4N1dVRkRla0lzWlVGQlpTeEZRVUZGTEdOQlFXTTdXVUZETDBJc2IwSkJRVzlDTEVWQlFVVXNXVUZCV1N4RFFVRkRMR3RDUVVGclFpeERRVUZETzFsQlEzUkVMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEU5QlFVOHNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJReXhQUVVGUE8xbEJRemRFTEZWQlFWVXNSVUZCUlN4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNWMEZCVnl4RlFVRkZPMU5CUTNSRUxFTkJRVU03VVVGRlJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4WlFVRlpMRU5CUVVNc1EwRkJRenRKUVVNdlJDeERRVUZETzBsQlJVUTdPMDlCUlVjN1NVRkZTeXhMUVVGTExFTkJRVU1zYlVKQlFXMUNMRU5CUXk5Q0xFOUJRVGhETEVWQlF6bERMRTFCUVc5Q08xRkJSWEJDTEUxQlFVMHNaVUZCWlN4SFFVRkhMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRGJrVXNTVUZCU1R0WlFVTkdMRTFCUVUwc2IwSkJRVzlDTEVkQlFVY3NaVUZCWlN4RFFVRkRMRzlDUVVGdlFpeERRVUZETzFsQlEyeEZMRTFCUVUwc1VVRkJVU3hIUVVGSExFMUJRVTBzYjBKQlFXOUNMRU5CUVVNc1pVRkJaU3hGUVVGRkxFTkJRVU03V1VGRE9VUXNUVUZCVFN4WFFVRlhMRWRCUVVjc1RVRkJUU3h2UWtGQmIwSXNRMEZCUXl4alFVRmpMRVZCUVVVc1EwRkJRenRaUVVOb1JTeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzV1VGQldTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRia1VzVFVGQlRTeERRVUZETEZsQlFWa3NSMEZCUnl4WFFVRlhMRU5CUVVNN1dVRkRiRU1zU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1UwRkRlRVE3VVVGQlF5eFBRVUZQTEVkQlFVY3NSVUZCUlR0WlFVTmFPenM3T3pzN08yTkJUMFU3V1VGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkRlRUlzYlVOQlFXMURPMmRDUVVOcVF5eHpSRUZCYzBRN1owSkJRM1JFTEVkQlFVY3NRMEZCUXl4SlFVRkpPMmRDUVVOU0xFZEJRVWNzUTBGQlF5eFBRVUZQTzJkQ1FVTllMRWxCUVVrN1owSkJRMG9zUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZEV2l4RFFVRkRPMWxCUTBZc1RVRkJUU3hEUVVGRExGbEJRVmtzUjBGQlJ5eFRRVUZUTEVOQlFVTTdXVUZEYUVNc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFZRVUZWTEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVMEZEZUVRN1NVRkRTQ3hEUVVGRE8wbEJSVVFzTkVKQlFUUkNPMGxCUTNCQ0xFdEJRVXNzUTBGQlF5eHJRa0ZCYTBJc1EwRkRPVUlzVDBGQk1FTXNSVUZETVVNc1QwRkJUeXhGUVVOUUxGbEJRVmtzUlVGRFdpeFhRVUZYTzFGQlJWZzdPenM3T3pzN1ZVRlBSVHRSUVVWR0xFMUJRVTBzUjBGQlJ5eEhRVU5RTEU5QlFVOHNRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhDTEVOQlFVTXNRMEZCUXl4TlFVRk5MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRka01zUTBGQlF5eERRVUZETEVWQlFVVXNVVUZCVVN4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzVTBGQlV5eEZRVUZGTEVOQlFVTTdVVUZGY0VRc1RVRkJUU3hOUVVGTkxFZEJRVWNzUlVGQmEwSXNRMEZCUXp0UlFVVnNReXhOUVVGTkxFTkJRVU1zVTBGQlV5eEhRVUZITEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRE5VTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRE5VSXNUVUZCVFN4RFFVRkRMSE5DUVVGelFpeEhRVUZITEc5Q1FVRnZRaXhEUVVGRE8xRkJRM0pFTEUxQlFVMHNRMEZCUXl4aFFVRmhMRWRCUVVjc1dVRkJXU3hEUVVGRE8xRkJRM0JETEUxQlFVMHNRMEZCUXl4VFFVRlRMRWRCUVVjc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZET1VJc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUld4RExHMUdRVUZ0Ump0UlFVTnVSaXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRk9VTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU51UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVVjJReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMUZCUTNoQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSVFZDTEUxQlFVMHNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhaUVVGWkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTTdVVUZGTlVNc01FUkJRVEJFTzFGQlF6RkVMRFpGUVVFMlJUdFJRVU0zUlN3eVJVRkJNa1U3VVVGRE0wVXNSVUZCUlR0UlFVTkdMSEZDUVVGeFFqdFJRVU55UWl3d1FrRkJNRUk3VVVGRE1VSXNjME5CUVhORE8xRkJRM1JETEVsQlFVazdVVUZEU2l3MFEwRkJORU03VVVGRk5VTXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MRU5CUVVNc1pVRkJaU3hIUVVGSExHTkJRV01zUTBGQlF6dFJRVVY0UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRPVU1zVFVGQlRTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExGbEJRVmtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRE8xRkJSUzlFTEUxQlFVMHNXVUZCV1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZsQlFWa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVVdlF5eE5RVUZOTEdGQlFXRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFOUJRVThzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXp0UlFVTnVSU3hOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEdGQlFXRXNRMEZCUXl4UFFVRlBMRU5CUVVNN1VVRkRka01zVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4aFFVRmhMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJSWHBETEVsQlFVa3NTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeERRVUZETEZkQlFWY3NSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3V1VGRGNrUXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVNelF6dGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhWUVVGVkxFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03VTBGRGVFUTdTVUZEU0N4RFFVRkRPMGxCUlU4c1kwRkJZeXhEUVVGRExFOUJRVzlDTzFGQlEzcERMRTFCUVUwc1lVRkJZU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU42UWl4SlFVRkpMRkZCUVZFc1IwRkJSeXhGUVVGRkxFTkJRVU03VVVGRGJFSXNTVUZCU1N4UFFVRlBMRVZCUVVVN1dVRkRXQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNZMEZCWXl4RlFVRkZMRVZCUVVVN1owSkJRemRDTEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRkxFZEJRVWNzWTBGQll5eERRVUZETzJkQ1FVTjJReXhOUVVGTkxGZEJRVmNzUjBGQlJ5eEZRVUZGTEVOQlFVTTdaMEpCUTNaQ0xGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzSkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM1JETEdGQlFXRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03WjBKQlEyaERMRWxCUVVrc1NVRkJTU3hEUVVGRExGZEJRVmNzUlVGQlJTeExRVUZMTEZWQlFWVXNSVUZCUlR0dlFrRkRja01zVVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXp0cFFrRkRiRUk3V1VGRFNDeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUTBRc1QwRkJUenRaUVVOTUxFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMR0ZCUVdFc1EwRkJRenRaUVVOMFF5eFJRVUZSTEVWQlFVVXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkJRenRUUVVOcVF5eERRVUZETzBsQlEwb3NRMEZCUXp0RFFVTkdJbjA9IiwiaW1wb3J0IHsgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLWV2ZW50LW9yZGluYWxcIjtcbmltcG9ydCB7IGV4dGVuc2lvblNlc3Npb25VdWlkIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkXCI7XG5pbXBvcnQgeyBib29sVG9JbnQsIGVzY2FwZVN0cmluZywgZXNjYXBlVXJsIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBKYXZhc2NyaXB0SW5zdHJ1bWVudCB7XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgcmVjZWl2ZWQgY2FsbCBhbmQgdmFsdWVzIGRhdGEgZnJvbSB0aGUgSlMgSW5zdHJ1bWVudGF0aW9uXG4gICAgICogaW50byB0aGUgZm9ybWF0IHRoYXQgdGhlIHNjaGVtYSBleHBlY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gc2VuZGVyXG4gICAgICovXG4gICAgc3RhdGljIHByb2Nlc3NDYWxsc0FuZFZhbHVlcyhkYXRhLCBzZW5kZXIpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgdXBkYXRlLnBhZ2Vfc2NvcGVkX2V2ZW50X29yZGluYWwgPSBkYXRhLm9yZGluYWw7XG4gICAgICAgIHVwZGF0ZS53aW5kb3dfaWQgPSBzZW5kZXIudGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gc2VuZGVyLnRhYi5pZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gc2VuZGVyLmZyYW1lSWQ7XG4gICAgICAgIHVwZGF0ZS5zY3JpcHRfdXJsID0gZXNjYXBlVXJsKGRhdGEuc2NyaXB0VXJsKTtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF9saW5lID0gZXNjYXBlU3RyaW5nKGRhdGEuc2NyaXB0TGluZSk7XG4gICAgICAgIHVwZGF0ZS5zY3JpcHRfY29sID0gZXNjYXBlU3RyaW5nKGRhdGEuc2NyaXB0Q29sKTtcbiAgICAgICAgdXBkYXRlLmZ1bmNfbmFtZSA9IGVzY2FwZVN0cmluZyhkYXRhLmZ1bmNOYW1lKTtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF9sb2NfZXZhbCA9IGVzY2FwZVN0cmluZyhkYXRhLnNjcmlwdExvY0V2YWwpO1xuICAgICAgICB1cGRhdGUuY2FsbF9zdGFjayA9IGVzY2FwZVN0cmluZyhkYXRhLmNhbGxTdGFjayk7XG4gICAgICAgIHVwZGF0ZS5zeW1ib2wgPSBlc2NhcGVTdHJpbmcoZGF0YS5zeW1ib2wpO1xuICAgICAgICB1cGRhdGUub3BlcmF0aW9uID0gZXNjYXBlU3RyaW5nKGRhdGEub3BlcmF0aW9uKTtcbiAgICAgICAgdXBkYXRlLnZhbHVlID0gZXNjYXBlU3RyaW5nKGRhdGEudmFsdWUpO1xuICAgICAgICB1cGRhdGUudGltZV9zdGFtcCA9IGRhdGEudGltZVN0YW1wO1xuICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHNlbmRlci50YWIuaW5jb2duaXRvKTtcbiAgICAgICAgLy8gZG9jdW1lbnRfdXJsIGlzIHRoZSBjdXJyZW50IGZyYW1lJ3MgZG9jdW1lbnQgaHJlZlxuICAgICAgICAvLyB0b3BfbGV2ZWxfdXJsIGlzIHRoZSB0b3AtbGV2ZWwgZnJhbWUncyBkb2N1bWVudCBocmVmXG4gICAgICAgIHVwZGF0ZS5kb2N1bWVudF91cmwgPSBlc2NhcGVVcmwoc2VuZGVyLnVybCk7XG4gICAgICAgIHVwZGF0ZS50b3BfbGV2ZWxfdXJsID0gZXNjYXBlVXJsKHNlbmRlci50YWIudXJsKTtcbiAgICAgICAgaWYgKGRhdGEub3BlcmF0aW9uID09PSBcImNhbGxcIiAmJiBkYXRhLmFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdXBkYXRlLmFyZ3VtZW50cyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkYXRhLmFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXBkYXRlO1xuICAgIH1cbiAgICBkYXRhUmVjZWl2ZXI7XG4gICAgb25NZXNzYWdlTGlzdGVuZXI7XG4gICAgY29uZmlndXJlZCA9IGZhbHNlO1xuICAgIHBlbmRpbmdSZWNvcmRzID0gW107XG4gICAgY3Jhd2xJRDtcbiAgICBjb25zdHJ1Y3RvcihkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgbWVzc2FnZXMgZnJvbSBwYWdlL2NvbnRlbnQvYmFja2dyb3VuZCBzY3JpcHRzIGluamVjdGVkIHRvIGluc3RydW1lbnQgSmF2YVNjcmlwdCBBUElzXG4gICAgICovXG4gICAgbGlzdGVuKCkge1xuICAgICAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gKG1lc3NhZ2UsIHNlbmRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubmFtZXNwYWNlICYmXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5uYW1lc3BhY2UgPT09IFwiamF2YXNjcmlwdC1pbnN0cnVtZW50YXRpb25cIikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlSnNJbnN0cnVtZW50YXRpb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIodGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVpdGhlciBzZW5kcyB0aGUgbG9nIGRhdGEgdG8gdGhlIGRhdGFSZWNlaXZlciBvciBzdG9yZSBpdCBpbiBtZW1vcnlcbiAgICAgKiBhcyBhIHBlbmRpbmcgcmVjb3JkIGlmIHRoZSBKUyBpbnN0cnVtZW50YXRpb24gaXMgbm90IHlldCBjb25maWd1cmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBzZW5kZXJcbiAgICAgKi9cbiAgICBoYW5kbGVKc0luc3RydW1lbnRhdGlvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyKSB7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9nQ2FsbFwiOlxuICAgICAgICAgICAgY2FzZSBcImxvZ1ZhbHVlXCI6XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gSmF2YXNjcmlwdEluc3RydW1lbnQucHJvY2Vzc0NhbGxzQW5kVmFsdWVzKG1lc3NhZ2UuZGF0YSwgc2VuZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5icm93c2VyX2lkID0gdGhpcy5jcmF3bElEO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdFwiLCB1cGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3Jkcy5wdXNoKHVwZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBsaXN0ZW5pbmcgaWYgaGF2ZW4ndCBkb25lIHNvIGFscmVhZHksIHNldHMgdGhlIGNyYXdsIElELFxuICAgICAqIG1hcmtzIHRoZSBKUyBpbnN0cnVtZW50YXRpb24gYXMgY29uZmlndXJlZCBhbmQgc2VuZHMgYW55IHBlbmRpbmdcbiAgICAgKiByZWNvcmRzIHRoYXQgaGF2ZSBiZWVuIHJlY2VpdmVkIHVwIHVudGlsIHRoaXMgcG9pbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3Jhd2xJRFxuICAgICAqL1xuICAgIHJ1bihjcmF3bElEKSB7XG4gICAgICAgIGlmICghdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyYXdsSUQgPSBjcmF3bElEO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZWNvcmRzLm1hcCgodXBkYXRlKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUuYnJvd3Nlcl9pZCA9IHRoaXMuY3Jhd2xJRDtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0XCIsIHVwZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyByZWdpc3RlckNvbnRlbnRTY3JpcHQodGVzdGluZywganNJbnN0cnVtZW50YXRpb25TZXR0aW5ncykge1xuICAgICAgICBjb25zdCBjb250ZW50U2NyaXB0Q29uZmlnID0ge1xuICAgICAgICAgICAgdGVzdGluZyxcbiAgICAgICAgICAgIGpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb250ZW50U2NyaXB0Q29uZmlnKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBBdm9pZCB1c2luZyB3aW5kb3cgdG8gcGFzcyB0aGUgY29udGVudCBzY3JpcHQgY29uZmlnXG4gICAgICAgICAgICBhd2FpdCBicm93c2VyLmNvbnRlbnRTY3JpcHRzLnJlZ2lzdGVyKHtcbiAgICAgICAgICAgICAgICBqczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBgd2luZG93Lm9wZW5XcG1Db250ZW50U2NyaXB0Q29uZmlnID0gJHtKU09OLnN0cmluZ2lmeShjb250ZW50U2NyaXB0Q29uZmlnKX07YCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG1hdGNoZXM6IFtcIjxhbGxfdXJscz5cIl0sXG4gICAgICAgICAgICAgICAgYWxsRnJhbWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJ1bkF0OiBcImRvY3VtZW50X3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyb3dzZXIuY29udGVudFNjcmlwdHMucmVnaXN0ZXIoe1xuICAgICAgICAgICAganM6IFt7IGZpbGU6IFwiL2NvbnRlbnQuanNcIiB9XSxcbiAgICAgICAgICAgIG1hdGNoZXM6IFtcIjxhbGxfdXJscz5cIl0sXG4gICAgICAgICAgICBhbGxGcmFtZXM6IHRydWUsXG4gICAgICAgICAgICBydW5BdDogXCJkb2N1bWVudF9zdGFydFwiLFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3JkcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMkpoWTJ0bmNtOTFibVF2YW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVU5CTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4VFFVRlRMRVZCUVVVc1dVRkJXU3hGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEhGQ1FVRnhRaXhEUVVGRE8wRkJTWHBGTEUxQlFVMHNUMEZCVHl4dlFrRkJiMEk3U1VGREwwSTdPenM3T3p0UFFVMUhPMGxCUTBzc1RVRkJUU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1JVRkJSU3hOUVVGeFFqdFJRVU01UkN4TlFVRk5MRTFCUVUwc1IwRkJSeXhGUVVGNVFpeERRVUZETzFGQlEzcERMRTFCUVUwc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU55UkN4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExIVkNRVUYxUWl4RlFVRkZMRU5CUVVNN1VVRkRha1FzVFVGQlRTeERRVUZETEhsQ1FVRjVRaXhIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdVVUZEYUVRc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVOMlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETzFGQlF6bENMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXp0UlFVTnFReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZOQlFWTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRE9VTXNUVUZCVFN4RFFVRkRMRmRCUVZjc1IwRkJSeXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMUZCUTI1RUxFMUJRVTBzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRMME1zVFVGQlRTeERRVUZETEdWQlFXVXNSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzFGQlF6RkVMRTFCUVUwc1EwRkJReXhWUVVGVkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZETVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMmhFTEUxQlFVMHNRMEZCUXl4TFFVRkxMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTjRReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNN1VVRkRia01zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4VFFVRlRMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVVnVSQ3h2UkVGQmIwUTdVVUZEY0VRc2RVUkJRWFZFTzFGQlEzWkVMRTFCUVUwc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNMVF5eE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMRk5CUVZNc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUldwRUxFbEJRVWtzU1VGQlNTeERRVUZETEZOQlFWTXNTMEZCU3l4TlFVRk5MRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZPMWxCUTNKRUxFMUJRVTBzUTBGQlF5eFRRVUZUTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkROVVE3VVVGRlJDeFBRVUZQTEUxQlFVMHNRMEZCUXp0SlFVTm9RaXhEUVVGRE8wbEJRMmRDTEZsQlFWa3NRMEZCUXp0SlFVTjBRaXhwUWtGQmFVSXNRMEZCUXp0SlFVTnNRaXhWUVVGVkxFZEJRVmtzUzBGQlN5eERRVUZETzBsQlF6VkNMR05CUVdNc1IwRkJNRUlzUlVGQlJTeERRVUZETzBsQlF6TkRMRTlCUVU4c1EwRkJRenRKUVVWb1FpeFpRVUZaTEZsQlFWazdVVUZEZEVJc1NVRkJTU3hEUVVGRExGbEJRVmtzUjBGQlJ5eFpRVUZaTEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWRU96dFBRVVZITzBsQlEwa3NUVUZCVFR0UlFVTllMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUlVGQlJUdFpRVU16UXl4SlFVTkZMRTlCUVU4c1EwRkJReXhUUVVGVE8yZENRVU5xUWl4UFFVRlBMRU5CUVVNc1UwRkJVeXhMUVVGTExEUkNRVUUwUWl4RlFVTnNSRHRuUWtGRFFTeEpRVUZKTEVOQlFVTXNPRUpCUVRoQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMkZCUTNSRU8xRkJRMGdzUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzBsQlEyaEZMRU5CUVVNN1NVRkZSRHM3T3pzN08wOUJUVWM3U1VGRFNTdzRRa0ZCT0VJc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQmNVSTdVVUZEYkVVc1VVRkJVU3hQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTzFsQlEzQkNMRXRCUVVzc1UwRkJVeXhEUVVGRE8xbEJRMllzUzBGQlN5eFZRVUZWTzJkQ1FVTmlMRTFCUVUwc1RVRkJUU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRMSEZDUVVGeFFpeERRVU4yUkN4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVOYUxFMUJRVTBzUTBGRFVDeERRVUZETzJkQ1FVTkdMRWxCUVVrc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJUdHZRa0ZEYmtJc1RVRkJUU3hEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMjlDUVVOcVF5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhaUVVGWkxFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdhVUpCUTNCRU8zRkNRVUZOTzI5Q1FVTk1MRWxCUVVrc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMmxDUVVOc1F6dG5Ra0ZEUkN4TlFVRk5PMU5CUTFRN1NVRkRTQ3hEUVVGRE8wbEJSVVE3T3pzN096dFBRVTFITzBsQlEwa3NSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU16UWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU03VTBGRFpqdFJRVU5FTEVsQlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRE8xRkJRM1pDTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRM1pDTEVsQlFVa3NRMEZCUXl4alFVRmpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVFVGQlRTeEZRVUZGTEVWQlFVVTdXVUZEYWtNc1RVRkJUU3hEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMWxCUTJwRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMRmxCUVZrc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU55UkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlRTeExRVUZMTEVOQlFVTXNjVUpCUVhGQ0xFTkJRMmhETEU5QlFXZENMRVZCUTJoQ0xIbENRVUZuUkR0UlFVVm9SQ3hOUVVGTkxHMUNRVUZ0UWl4SFFVRkhPMWxCUXpGQ0xFOUJRVTg3V1VGRFVDeDVRa0ZCZVVJN1UwRkRNVUlzUTBGQlF6dFJRVU5HTEVsQlFVa3NiVUpCUVcxQ0xFVkJRVVU3V1VGRGRrSXNOa1JCUVRaRU8xbEJRemRFTEUxQlFVMHNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhSUVVGUkxFTkJRVU03WjBKQlEzQkRMRVZCUVVVc1JVRkJSVHR2UWtGRFJqdDNRa0ZEUlN4SlFVRkpMRVZCUVVVc2RVTkJRWFZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUTNwRUxHMUNRVUZ0UWl4RFFVTndRaXhIUVVGSE8zRkNRVU5NTzJsQ1FVTkdPMmRDUVVORUxFOUJRVThzUlVGQlJTeERRVUZETEZsQlFWa3NRMEZCUXp0blFrRkRka0lzVTBGQlV5eEZRVUZGTEVsQlFVazdaMEpCUTJZc1MwRkJTeXhGUVVGRkxHZENRVUZuUWp0blFrRkRka0lzWlVGQlpTeEZRVUZGTEVsQlFVazdZVUZEZEVJc1EwRkJReXhEUVVGRE8xTkJRMG83VVVGRFJDeFBRVUZQTEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xbEJRM0pETEVWQlFVVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxHRkJRV0VzUlVGQlJTeERRVUZETzFsQlF6ZENMRTlCUVU4c1JVRkJSU3hEUVVGRExGbEJRVmtzUTBGQlF6dFpRVU4yUWl4VFFVRlRMRVZCUVVVc1NVRkJTVHRaUVVObUxFdEJRVXNzUlVGQlJTeG5Ra0ZCWjBJN1dVRkRka0lzWlVGQlpTeEZRVUZGTEVsQlFVazdVMEZEZEVJc1EwRkJReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZOTEU5QlFVODdVVUZEV2l4SlFVRkpMRU5CUVVNc1kwRkJZeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU42UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNSVUZCUlR0WlFVTXhRaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1UwRkRiRVU3U1VGRFNDeERRVUZETzBOQlEwWWlmUT09IiwiaW1wb3J0IHsgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLWV2ZW50LW9yZGluYWxcIjtcbmltcG9ydCB7IGV4dGVuc2lvblNlc3Npb25VdWlkIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkXCI7XG5pbXBvcnQgeyBQZW5kaW5nTmF2aWdhdGlvbiB9IGZyb20gXCIuLi9saWIvcGVuZGluZy1uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyBib29sVG9JbnQsIGVzY2FwZVN0cmluZywgZXNjYXBlVXJsIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbmltcG9ydCB7IG1ha2VVVUlEIH0gZnJvbSBcIi4uL2xpYi91dWlkXCI7XG5leHBvcnQgY29uc3QgdHJhbnNmb3JtV2ViTmF2aWdhdGlvbkJhc2VFdmVudERldGFpbHNUb09wZW5XUE1TY2hlbWEgPSBhc3luYyAoY3Jhd2xJRCwgZGV0YWlscykgPT4ge1xuICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICA/IGF3YWl0IGJyb3dzZXIudGFicy5nZXQoZGV0YWlscy50YWJJZClcbiAgICAgICAgOiB7XG4gICAgICAgICAgICB3aW5kb3dJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaW5jb2duaXRvOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjb29raWVTdG9yZUlkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvcGVuZXJUYWJJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgIGNvbnN0IHdpbmRvdyA9IHRhYi53aW5kb3dJZFxuICAgICAgICA/IGF3YWl0IGJyb3dzZXIud2luZG93cy5nZXQodGFiLndpbmRvd0lkKVxuICAgICAgICA6IHsgd2lkdGg6IHVuZGVmaW5lZCwgaGVpZ2h0OiB1bmRlZmluZWQsIHR5cGU6IHVuZGVmaW5lZCB9O1xuICAgIGNvbnN0IG5hdmlnYXRpb24gPSB7XG4gICAgICAgIGJyb3dzZXJfaWQ6IGNyYXdsSUQsXG4gICAgICAgIGluY29nbml0bzogYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pLFxuICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgcHJvY2Vzc19pZDogZGV0YWlscy5wcm9jZXNzSWQsXG4gICAgICAgIHdpbmRvd19pZDogdGFiLndpbmRvd0lkLFxuICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgIHRhYl9vcGVuZXJfdGFiX2lkOiB0YWIub3BlbmVyVGFiSWQsXG4gICAgICAgIGZyYW1lX2lkOiBkZXRhaWxzLmZyYW1lSWQsXG4gICAgICAgIHdpbmRvd193aWR0aDogd2luZG93LndpZHRoLFxuICAgICAgICB3aW5kb3dfaGVpZ2h0OiB3aW5kb3cuaGVpZ2h0LFxuICAgICAgICB3aW5kb3dfdHlwZTogd2luZG93LnR5cGUsXG4gICAgICAgIHRhYl93aWR0aDogdGFiLndpZHRoLFxuICAgICAgICB0YWJfaGVpZ2h0OiB0YWIuaGVpZ2h0LFxuICAgICAgICB0YWJfY29va2llX3N0b3JlX2lkOiBlc2NhcGVTdHJpbmcodGFiLmNvb2tpZVN0b3JlSWQpLFxuICAgICAgICB1dWlkOiBtYWtlVVVJRCgpLFxuICAgICAgICB1cmw6IGVzY2FwZVVybChkZXRhaWxzLnVybCksXG4gICAgfTtcbiAgICByZXR1cm4gbmF2aWdhdGlvbjtcbn07XG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkluc3RydW1lbnQge1xuICAgIHN0YXRpYyBuYXZpZ2F0aW9uSWQocHJvY2Vzc0lkLCB0YWJJZCwgZnJhbWVJZCkge1xuICAgICAgICByZXR1cm4gYCR7cHJvY2Vzc0lkfS0ke3RhYklkfS0ke2ZyYW1lSWR9YDtcbiAgICB9XG4gICAgZGF0YVJlY2VpdmVyO1xuICAgIG9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcjtcbiAgICBvbkNvbW1pdHRlZExpc3RlbmVyO1xuICAgIHBlbmRpbmdOYXZpZ2F0aW9ucyA9IHt9O1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIgPSBhc3luYyAoZGV0YWlscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbklkID0gTmF2aWdhdGlvbkluc3RydW1lbnQubmF2aWdhdGlvbklkKGRldGFpbHMucHJvY2Vzc0lkLCBkZXRhaWxzLnRhYklkLCBkZXRhaWxzLmZyYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgcGVuZGluZ05hdmlnYXRpb24gPSB0aGlzLmluc3RhbnRpYXRlUGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKTtcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb24gPSBhd2FpdCB0cmFuc2Zvcm1XZWJOYXZpZ2F0aW9uQmFzZUV2ZW50RGV0YWlsc1RvT3BlbldQTVNjaGVtYShjcmF3bElELCBkZXRhaWxzKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkID0gZGV0YWlscy5wYXJlbnRGcmFtZUlkO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfZXZlbnRfb3JkaW5hbCA9IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV90aW1lX3N0YW1wID0gbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICBwZW5kaW5nTmF2aWdhdGlvbi5yZXNvbHZlT25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbihuYXZpZ2F0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIgPSBhc3luYyAoZGV0YWlscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbklkID0gTmF2aWdhdGlvbkluc3RydW1lbnQubmF2aWdhdGlvbklkKGRldGFpbHMucHJvY2Vzc0lkLCBkZXRhaWxzLnRhYklkLCBkZXRhaWxzLmZyYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbiA9IGF3YWl0IHRyYW5zZm9ybVdlYk5hdmlnYXRpb25CYXNlRXZlbnREZXRhaWxzVG9PcGVuV1BNU2NoZW1hKGNyYXdsSUQsIGRldGFpbHMpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50cmFuc2l0aW9uX3F1YWxpZmllcnMgPSBlc2NhcGVTdHJpbmcoSlNPTi5zdHJpbmdpZnkoZGV0YWlscy50cmFuc2l0aW9uUXVhbGlmaWVycykpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50cmFuc2l0aW9uX3R5cGUgPSBlc2NhcGVTdHJpbmcoZGV0YWlscy50cmFuc2l0aW9uVHlwZSk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmNvbW1pdHRlZF9ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uY29tbWl0dGVkX3RpbWVfc3RhbXAgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIC8vIGluY2x1ZGUgYXR0cmlidXRlcyBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIG9uQmVmb3JlTmF2aWdhdGlvbiBldmVudFxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ05hdmlnYXRpb24gPSB0aGlzLmdldFBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCk7XG4gICAgICAgICAgICBpZiAocGVuZGluZ05hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nTmF2aWdhdGlvbi5yZXNvbHZlT25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24obmF2aWdhdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBwZW5kaW5nTmF2aWdhdGlvbi5yZXNvbHZlZFdpdGhpblRpbWVvdXQoMTAwMCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24gPSBhd2FpdCBwZW5kaW5nTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLnBhcmVudF9mcmFtZV9pZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uLnBhcmVudF9mcmFtZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfZXZlbnRfb3JkaW5hbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV90aW1lX3N0YW1wID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcIm5hdmlnYXRpb25zXCIsIG5hdmlnYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQuYWRkTGlzdGVuZXIodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZS5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Db21taXR0ZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJOYXZpZ2F0aW9uLm9uQ29tbWl0dGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25Db21taXR0ZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFudGlhdGVQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nTmF2aWdhdGlvbnNbbmF2aWdhdGlvbklkXSA9IG5ldyBQZW5kaW5nTmF2aWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nTmF2aWdhdGlvbnNbbmF2aWdhdGlvbklkXTtcbiAgICB9XG4gICAgZ2V0UGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtRjJhV2RoZEdsdmJpMXBibk4wY25WdFpXNTBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMkpoWTJ0bmNtOTFibVF2Ym1GMmFXZGhkR2x2YmkxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeE5RVUZOTERKQ1FVRXlRaXhEUVVGRE8wRkJRemxFTEU5QlFVOHNSVUZCUlN4VFFVRlRMRVZCUVVVc1dVRkJXU3hGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEhGQ1FVRnhRaXhEUVVGRE8wRkJRM3BGTEU5QlFVOHNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hoUVVGaExFTkJRVU03UVVGUmRrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc2NVUkJRWEZFTEVkQlFVY3NTMEZCU3l4RlFVTjRSU3hQUVVGUExFVkJRMUFzVDBGQmMwTXNSVUZEYWtJc1JVRkJSVHRKUVVOMlFpeE5RVUZOTEVkQlFVY3NSMEZEVUN4UFFVRlBMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5vUWl4RFFVRkRMRU5CUVVNc1RVRkJUU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRE8xRkJRM1pETEVOQlFVTXNRMEZCUXp0WlFVTkZMRkZCUVZFc1JVRkJSU3hUUVVGVE8xbEJRMjVDTEZOQlFWTXNSVUZCUlN4VFFVRlRPMWxCUTNCQ0xHRkJRV0VzUlVGQlJTeFRRVUZUTzFsQlEzaENMRmRCUVZjc1JVRkJSU3hUUVVGVE8xbEJRM1JDTEV0QlFVc3NSVUZCUlN4VFFVRlRPMWxCUTJoQ0xFMUJRVTBzUlVGQlJTeFRRVUZUTzFOQlEyeENMRU5CUVVNN1NVRkRVaXhOUVVGTkxFMUJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTXNVVUZCVVR0UlFVTjZRaXhEUVVGRExFTkJRVU1zVFVGQlRTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETzFGQlEzcERMRU5CUVVNc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVWQlFVVXNUVUZCVFN4RlFVRkZMRk5CUVZNc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTEVOQlFVTTdTVUZETjBRc1RVRkJUU3hWUVVGVkxFZEJRV1U3VVVGRE4wSXNWVUZCVlN4RlFVRkZMRTlCUVU4N1VVRkRia0lzVTBGQlV5eEZRVUZGTEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRMjVETEhOQ1FVRnpRaXhGUVVGRkxHOUNRVUZ2UWp0UlFVTTFReXhWUVVGVkxFVkJRVVVzVDBGQlR5eERRVUZETEZOQlFWTTdVVUZETjBJc1UwRkJVeXhGUVVGRkxFZEJRVWNzUTBGQlF5eFJRVUZSTzFGQlEzWkNMRTFCUVUwc1JVRkJSU3hQUVVGUExFTkJRVU1zUzBGQlN6dFJRVU55UWl4cFFrRkJhVUlzUlVGQlJTeEhRVUZITEVOQlFVTXNWMEZCVnp0UlFVTnNReXhSUVVGUkxFVkJRVVVzVDBGQlR5eERRVUZETEU5QlFVODdVVUZEZWtJc1dVRkJXU3hGUVVGRkxFMUJRVTBzUTBGQlF5eExRVUZMTzFGQlF6RkNMR0ZCUVdFc1JVRkJSU3hOUVVGTkxFTkJRVU1zVFVGQlRUdFJRVU0xUWl4WFFVRlhMRVZCUVVVc1RVRkJUU3hEUVVGRExFbEJRVWs3VVVGRGVFSXNVMEZCVXl4RlFVRkZMRWRCUVVjc1EwRkJReXhMUVVGTE8xRkJRM0JDTEZWQlFWVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1RVRkJUVHRSUVVOMFFpeHRRa0ZCYlVJc1JVRkJSU3haUVVGWkxFTkJRVU1zUjBGQlJ5eERRVUZETEdGQlFXRXNRMEZCUXp0UlFVTndSQ3hKUVVGSkxFVkJRVVVzVVVGQlVTeEZRVUZGTzFGQlEyaENMRWRCUVVjc1JVRkJSU3hUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0TFFVTTFRaXhEUVVGRE8wbEJRMFlzVDBGQlR5eFZRVUZWTEVOQlFVTTdRVUZEY0VJc1EwRkJReXhEUVVGRE8wRkJSVVlzVFVGQlRTeFBRVUZQTEc5Q1FVRnZRanRKUVVONFFpeE5RVUZOTEVOQlFVTXNXVUZCV1N4RFFVRkRMRk5CUVZNc1JVRkJSU3hMUVVGTExFVkJRVVVzVDBGQlR6dFJRVU5zUkN4UFFVRlBMRWRCUVVjc1UwRkJVeXhKUVVGSkxFdEJRVXNzU1VGQlNTeFBRVUZQTEVWQlFVVXNRMEZCUXp0SlFVTTFReXhEUVVGRE8wbEJRMmRDTEZsQlFWa3NRMEZCUXp0SlFVTjBRaXgzUWtGQmQwSXNRMEZCUXp0SlFVTjZRaXh0UWtGQmJVSXNRMEZCUXp0SlFVTndRaXhyUWtGQmEwSXNSMEZGZEVJc1JVRkJSU3hEUVVGRE8wbEJSVkFzV1VGQldTeFpRVUZaTzFGQlEzUkNMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETzBsQlEyNURMRU5CUVVNN1NVRkZUU3hIUVVGSExFTkJRVU1zVDBGQlR6dFJRVU5vUWl4SlFVRkpMRU5CUVVNc2QwSkJRWGRDTEVkQlFVY3NTMEZCU3l4RlFVTnVReXhQUVVGclJDeEZRVU5zUkN4RlFVRkZPMWxCUTBZc1RVRkJUU3haUVVGWkxFZEJRVWNzYjBKQlFXOUNMRU5CUVVNc1dVRkJXU3hEUVVOd1JDeFBRVUZQTEVOQlFVTXNVMEZCVXl4RlFVTnFRaXhQUVVGUExFTkJRVU1zUzBGQlN5eEZRVU5pTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUTJoQ0xFTkJRVU03V1VGRFJpeE5RVUZOTEdsQ1FVRnBRaXhIUVVGSExFbEJRVWtzUTBGQlF5dzBRa0ZCTkVJc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dFpRVU14UlN4TlFVRk5MRlZCUVZVc1IwRkRaQ3hOUVVGTkxIRkVRVUZ4UkN4RFFVTjZSQ3hQUVVGUExFVkJRMUFzVDBGQlR5eERRVU5TTEVOQlFVTTdXVUZEU2l4VlFVRlZMRU5CUVVNc1pVRkJaU3hIUVVGSExFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTTdXVUZEYmtRc1ZVRkJWU3hEUVVGRExEWkNRVUUyUWl4SFFVRkhMSFZDUVVGMVFpeEZRVUZGTEVOQlFVTTdXVUZEY2tVc1ZVRkJWU3hEUVVGRExEQkNRVUV3UWl4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVNNVF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVTnNRaXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFsQlEyaENMR2xDUVVGcFFpeERRVUZETEhORFFVRnpReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlEzWkZMRU5CUVVNc1EwRkJRenRSUVVOR0xFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVjBGQlZ5eERRVU5vUkN4SlFVRkpMRU5CUVVNc2QwSkJRWGRDTEVOQlF6bENMRU5CUVVNN1VVRkRSaXhKUVVGSkxFTkJRVU1zYlVKQlFXMUNMRWRCUVVjc1MwRkJTeXhGUVVNNVFpeFBRVUUyUXl4RlFVTTNReXhGUVVGRk8xbEJRMFlzVFVGQlRTeFpRVUZaTEVkQlFVY3NiMEpCUVc5Q0xFTkJRVU1zV1VGQldTeERRVU53UkN4UFFVRlBMRU5CUVVNc1UwRkJVeXhGUVVOcVFpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RlFVTmlMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRMmhDTEVOQlFVTTdXVUZEUml4TlFVRk5MRlZCUVZVc1IwRkRaQ3hOUVVGTkxIRkVRVUZ4UkN4RFFVTjZSQ3hQUVVGUExFVkJRMUFzVDBGQlR5eERRVU5TTEVOQlFVTTdXVUZEU2l4VlFVRlZMRU5CUVVNc2NVSkJRWEZDTEVkQlFVY3NXVUZCV1N4RFFVTTNReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEU5QlFVOHNRMEZCUXl4dlFrRkJiMElzUTBGQlF5eERRVU0zUXl4RFFVRkRPMWxCUTBZc1ZVRkJWU3hEUVVGRExHVkJRV1VzUjBGQlJ5eFpRVUZaTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8xbEJRMnhGTEZWQlFWVXNRMEZCUXl4MVFrRkJkVUlzUjBGQlJ5eDFRa0ZCZFVJc1JVRkJSU3hEUVVGRE8xbEJReTlFTEZWQlFWVXNRMEZCUXl4dlFrRkJiMElzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZEZUVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRGJFSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRaUVVWb1FpeHhSVUZCY1VVN1dVRkRja1VzVFVGQlRTeHBRa0ZCYVVJc1IwRkJSeXhKUVVGSkxFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03V1VGRGJFVXNTVUZCU1N4cFFrRkJhVUlzUlVGQlJUdG5Ra0ZEY2tJc2FVSkJRV2xDTEVOQlFVTXNhVU5CUVdsRExFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdaMEpCUTJoRkxFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNhVUpCUVdsQ0xFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEzSkZMRWxCUVVrc1VVRkJVU3hGUVVGRk8yOUNRVU5hTEUxQlFVMHNLMEpCUVN0Q0xFZEJRMjVETEUxQlFVMHNhVUpCUVdsQ0xFTkJRVU1zSzBKQlFTdENMRU5CUVVNN2IwSkJRekZFTEZWQlFWVXNRMEZCUXl4bFFVRmxPM2RDUVVONFFpd3JRa0ZCSzBJc1EwRkJReXhsUVVGbExFTkJRVU03YjBKQlEyeEVMRlZCUVZVc1EwRkJReXcyUWtGQk5rSTdkMEpCUTNSRExDdENRVUVyUWl4RFFVRkRMRFpDUVVFMlFpeERRVUZETzI5Q1FVTm9SU3hWUVVGVkxFTkJRVU1zTUVKQlFUQkNPM2RDUVVOdVF5d3JRa0ZCSzBJc1EwRkJReXd3UWtGQk1FSXNRMEZCUXp0cFFrRkRPVVE3WVVGRFJqdFpRVVZFTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1ZVRkJWU3hEUVVGRExHRkJRV0VzUlVGQlJTeFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTXhSQ3hEUVVGRExFTkJRVU03VVVGRFJpeFBRVUZQTEVOQlFVTXNZVUZCWVN4RFFVRkRMRmRCUVZjc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExFTkJRVU03U1VGRE1VVXNRMEZCUXp0SlFVVk5MRTlCUVU4N1VVRkRXaXhKUVVGSkxFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSVHRaUVVOcVF5eFBRVUZQTEVOQlFVTXNZVUZCWVN4RFFVRkRMR2RDUVVGblFpeERRVUZETEdOQlFXTXNRMEZEYmtRc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RFFVTTVRaXhEUVVGRE8xTkJRMGc3VVVGRFJDeEpRVUZKTEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUlVGQlJUdFpRVU0xUWl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGZEJRVmNzUTBGQlF5eGpRVUZqTEVOQlF6bERMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNRMEZEZWtJc1EwRkJRenRUUVVOSU8wbEJRMGdzUTBGQlF6dEpRVVZQTERSQ1FVRTBRaXhEUVVOc1F5eFpRVUZ2UWp0UlFVVndRaXhKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1dVRkJXU3hEUVVGRExFZEJRVWNzU1VGQlNTeHBRa0ZCYVVJc1JVRkJSU3hEUVVGRE8xRkJRMmhGTEU5QlFVOHNTVUZCU1N4RFFVRkRMR3RDUVVGclFpeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMGxCUXk5RExFTkJRVU03U1VGRlR5eHZRa0ZCYjBJc1EwRkJReXhaUVVGdlFqdFJRVU12UXl4UFFVRlBMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJRenRKUVVNdlF5eERRVUZETzBOQlEwWWlmUT09IiwiaW1wb3J0IHsgZ2V0SW5zdHJ1bWVudEpTIH0gZnJvbSBcIi4uL2xpYi9qcy1pbnN0cnVtZW50c1wiO1xuaW1wb3J0IHsgcGFnZVNjcmlwdCB9IGZyb20gXCIuL2phdmFzY3JpcHQtaW5zdHJ1bWVudC1wYWdlLXNjb3BlXCI7XG5mdW5jdGlvbiBnZXRQYWdlU2NyaXB0QXNTdHJpbmcoanNJbnN0cnVtZW50YXRpb25TZXR0aW5ncykge1xuICAgIC8vIFRoZSBKUyBJbnN0cnVtZW50IFJlcXVlc3RzIGFyZSBzZXR1cCBhbmQgdmFsaWRhdGVkIHB5dGhvbiBzaWRlXG4gICAgLy8gaW5jbHVkaW5nIHNldHRpbmcgZGVmYXVsdHMgZm9yIGxvZ1NldHRpbmdzLiBTZWUgSlNJbnN0cnVtZW50YXRpb24ucHlcbiAgICBjb25zdCBwYWdlU2NyaXB0U3RyaW5nID0gYFxuLy8gU3RhcnQgb2YganMtaW5zdHJ1bWVudHMuXG4ke2dldEluc3RydW1lbnRKU31cbi8vIEVuZCBvZiBqcy1pbnN0cnVtZW50cy5cblxuLy8gU3RhcnQgb2YgY3VzdG9tIGluc3RydW1lbnRSZXF1ZXN0cy5cbmNvbnN0IGpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MgPSAke0pTT04uc3RyaW5naWZ5KGpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MpfTtcbi8vIEVuZCBvZiBjdXN0b20gaW5zdHJ1bWVudFJlcXVlc3RzLlxuXG4vLyBTdGFydCBvZiBhbm9ueW1vdXMgZnVuY3Rpb24gZnJvbSBqYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS50c1xuKCR7cGFnZVNjcmlwdH0oZ2V0SW5zdHJ1bWVudEpTLCBqc0luc3RydW1lbnRhdGlvblNldHRpbmdzKSk7XG4vLyBFbmQuXG4gIGA7XG4gICAgcmV0dXJuIHBhZ2VTY3JpcHRTdHJpbmc7XG59XG47XG5mdW5jdGlvbiBpbnNlcnRTY3JpcHQocGFnZVNjcmlwdFN0cmluZywgZXZlbnRJZCwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnRleHQgPSBwYWdlU2NyaXB0U3RyaW5nO1xuICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWV2ZW50LWlkXCIsIGV2ZW50SWQpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRlc3RpbmdcIiwgYCR7dGVzdGluZ31gKTtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChzY3JpcHQpO1xufVxuO1xuZnVuY3Rpb24gZW1pdE1zZyh0eXBlLCBtc2cpIHtcbiAgICBtc2cudGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIG5hbWVzcGFjZTogXCJqYXZhc2NyaXB0LWluc3RydW1lbnRhdGlvblwiLFxuICAgICAgICB0eXBlLFxuICAgICAgICBkYXRhOiBtc2csXG4gICAgfSk7XG59XG47XG5jb25zdCBldmVudElkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpO1xuLy8gbGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBzY3JpcHQgd2UgYXJlIGFib3V0IHRvIGluc2VydFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudElkLCAoZSkgPT4ge1xuICAgIC8vIHBhc3MgdGhlc2Ugb24gdG8gdGhlIGJhY2tncm91bmQgcGFnZVxuICAgIGNvbnN0IG1zZ3MgPSBlLmRldGFpbDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtc2dzKSkge1xuICAgICAgICBtc2dzLmZvckVhY2goKG1zZykgPT4ge1xuICAgICAgICAgICAgZW1pdE1zZyhtc2cudHlwZSwgbXNnLmNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVtaXRNc2cobXNncy50eXBlLCBtc2dzLmNvbnRlbnQpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IGluamVjdEphdmFzY3JpcHRJbnN0cnVtZW50UGFnZVNjcmlwdCA9IChjb250ZW50U2NyaXB0Q29uZmlnKSA9PiB7XG4gICAgaW5zZXJ0U2NyaXB0KGdldFBhZ2VTY3JpcHRBc1N0cmluZyhjb250ZW50U2NyaXB0Q29uZmlnLmpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MpLCBldmVudElkLCBjb250ZW50U2NyaXB0Q29uZmlnLnRlc3RpbmcpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMV052Ym5SbGJuUXRjMk52Y0dVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlkyOXVkR1Z1ZEM5cVlYWmhjMk55YVhCMExXbHVjM1J5ZFcxbGJuUXRZMjl1ZEdWdWRDMXpZMjl3WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExFVkJRVVVzWlVGQlpTeEZRVUYxUWl4TlFVRk5MSFZDUVVGMVFpeERRVUZETzBGQlF6ZEZMRTlCUVU4c1JVRkJSU3hWUVVGVkxFVkJRVVVzVFVGQlRTeHZRMEZCYjBNc1EwRkJRenRCUVVkb1JTeFRRVUZUTEhGQ1FVRnhRaXhEUVVNMVFpeDVRa0ZCWjBRN1NVRkZhRVFzYVVWQlFXbEZPMGxCUTJwRkxIVkZRVUYxUlR0SlFVTjJSU3hOUVVGTkxHZENRVUZuUWl4SFFVRkhPenRGUVVWNlFpeGxRVUZsT3pzN08yOURRVWx0UWl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExIbENRVUY1UWl4RFFVRkRPenM3TzBkQlNURkZMRlZCUVZVN08wZEJSVllzUTBGQlF6dEpRVU5HTEU5QlFVOHNaMEpCUVdkQ0xFTkJRVU03UVVGRE1VSXNRMEZCUXp0QlFVRkJMRU5CUVVNN1FVRkZSaXhUUVVGVExGbEJRVmtzUTBGRGJrSXNaMEpCUVhkQ0xFVkJRM2hDTEU5QlFXVXNSVUZEWml4VlFVRnRRaXhMUVVGTE8wbEJSWGhDTEUxQlFVMHNUVUZCVFN4SFFVRkhMRkZCUVZFc1EwRkJReXhsUVVGbExFTkJRVU03U1VGRGVFTXNUVUZCVFN4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVTm9SQ3hOUVVGTkxFTkJRVU1zU1VGQlNTeEhRVUZITEdkQ1FVRm5RaXhEUVVGRE8wbEJReTlDTEUxQlFVMHNRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wbEJRM0pDTEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1pVRkJaU3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBsQlF6bERMRTFCUVUwc1EwRkJReXhaUVVGWkxFTkJRVU1zWTBGQll5eEZRVUZGTEVkQlFVY3NUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVOc1JDeE5RVUZOTEVOQlFVTXNXVUZCV1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hOUVVGTkxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdTVUZETDBNc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0QlFVTTNRaXhEUVVGRE8wRkJRVUVzUTBGQlF6dEJRVVZHTEZOQlFWTXNUMEZCVHl4RFFVRkZMRWxCUVVrc1JVRkJSU3hIUVVGSE8wbEJRM3BDTEVkQlFVY3NRMEZCUXl4VFFVRlRMRWRCUVVjc1NVRkJTU3hKUVVGSkxFVkJRVVVzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0SlFVTjZReXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXp0UlFVTXhRaXhUUVVGVExFVkJRVVVzTkVKQlFUUkNPMUZCUTNaRExFbEJRVWs3VVVGRFNpeEpRVUZKTEVWQlFVVXNSMEZCUnp0TFFVTldMRU5CUVVNc1EwRkJRenRCUVVOTUxFTkJRVU03UVVGQlFTeERRVUZETzBGQlJVWXNUVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRPMEZCUlhwRExEWkVRVUUyUkR0QlFVTTNSQ3hSUVVGUkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQll5eEZRVUZGTEVWQlFVVTdTVUZEY0VRc2RVTkJRWFZETzBsQlEzWkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZEZEVJc1NVRkJTU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMUZCUTNaQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSVHRaUVVOdVFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRFNqdFRRVUZOTzFGQlEwd3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMHRCUTJ4RE8wRkJRMGdzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZGU0N4TlFVRk5MRU5CUVVNc1RVRkJUU3h2UTBGQmIwTXNSMEZCUnl4RFFVRkRMRzFDUVVFclF5eEZRVUZGTEVWQlFVVTdTVUZEZEVjc1dVRkJXU3hEUVVOV0xIRkNRVUZ4UWl4RFFVRkRMRzFDUVVGdFFpeERRVUZETEhsQ1FVRjVRaXhEUVVGRExFVkJRM0JGTEU5QlFVOHNSVUZEVUN4dFFrRkJiVUlzUTBGQlF5eFBRVUZQTEVOQlF6VkNMRU5CUVVNN1FVRkRTaXhEUVVGRExFTkJRVUVpZlE9PSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8vIENvZGUgYmVsb3cgaXMgbm90IGEgY29udGVudCBzY3JpcHQ6IG5vIEZpcmVmb3ggQVBJcyBzaG91bGQgYmUgdXNlZFxuLy8gQWxzbywgbm8gd2VicGFjay9lczYgaW1wb3J0cyBtYXkgYmUgdXNlZCBpbiB0aGlzIGZpbGUgc2luY2UgdGhlIHNjcmlwdFxuLy8gaXMgZXhwb3J0ZWQgYXMgYSBwYWdlIHNjcmlwdCBhcyBhIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHBhZ2VTY3JpcHQoZ2V0SW5zdHJ1bWVudEpTLCBqc0luc3RydW1lbnRhdGlvblNldHRpbmdzKSB7XG4gICAgLy8gbWVzc2FnZXMgdGhlIGluamVjdGVkIHNjcmlwdFxuICAgIGNvbnN0IHNlbmRNZXNzYWdlc1RvTG9nZ2VyID0gKGV2ZW50SWQsIG1lc3NhZ2VzKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50SWQsIHtcbiAgICAgICAgICAgIGRldGFpbDogbWVzc2FnZXMsXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50SWQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtZXZlbnQtaWRcIik7XG4gICAgY29uc3QgdGVzdGluZyA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0aW5nXCIpO1xuICAgIGNvbnN0IGluc3RydW1lbnRKUyA9IGdldEluc3RydW1lbnRKUyhldmVudElkLCBzZW5kTWVzc2FnZXNUb0xvZ2dlcik7XG4gICAgbGV0IHQwO1xuICAgIGlmICh0ZXN0aW5nID09PSBcInRydWVcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEN1cnJlbnRseSB0ZXN0aW5nXCIpO1xuICAgICAgICB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJlZ2luIGxvYWRpbmcgSlMgaW5zdHJ1bWVudGF0aW9uLlwiKTtcbiAgICB9XG4gICAgaW5zdHJ1bWVudEpTKGpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MpO1xuICAgIGlmICh0ZXN0aW5nID09PSBcInRydWVcIikge1xuICAgICAgICBjb25zdCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgQ2FsbCB0byBpbnN0cnVtZW50SlMgdG9vayAke3QxIC0gdDB9IG1pbGxpc2Vjb25kcy5gKTtcbiAgICAgICAgd2luZG93Lmluc3RydW1lbnRKUyA9IGluc3RydW1lbnRKUztcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBDb250ZW50LXNpZGUgamF2YXNjcmlwdCBpbnN0cnVtZW50YXRpb24gc3RhcnRlZCB3aXRoIHNwZWM6XCIsIGpzSW5zdHJ1bWVudGF0aW9uU2V0dGluZ3MsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSwgXCIoaWYgc3BlYyBpcyAnPHVuYXZhaWxhYmxlPicgY2hlY2sgd2ViIGNvbnNvbGUuKVwiKTtcbiAgICB9XG59XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTFhCaFoyVXRjMk52Y0dVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlkyOXVkR1Z1ZEM5cVlYWmhjMk55YVhCMExXbHVjM1J5ZFcxbGJuUXRjR0ZuWlMxelkyOXdaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTd3JRa0ZCSzBJN1FVRkRMMElzY1VWQlFYRkZPMEZCUTNKRkxIbEZRVUY1UlR0QlFVTjZSU3d5UTBGQk1rTTdRVUZGTTBNc1RVRkJUU3hWUVVGVkxGVkJRVlVzUTBGQlJTeGxRVUZsTEVWQlFVVXNlVUpCUVhsQ08wbEJRM0JGTEN0Q1FVRXJRanRKUVVNdlFpeE5RVUZOTEc5Q1FVRnZRaXhIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTEZGQlFWRXNSVUZCUlN4RlFVRkZPMUZCUTJwRUxGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlEzQkNMRWxCUVVrc1YwRkJWeXhEUVVGRExFOUJRVThzUlVGQlJUdFpRVU4yUWl4TlFVRk5MRVZCUVVVc1VVRkJVVHRUUVVOcVFpeERRVUZETEVOQlEwZ3NRMEZCUXp0SlFVTktMRU5CUVVNc1EwRkJRenRKUVVWR0xFMUJRVTBzVDBGQlR5eEhRVUZITEZGQlFWRXNRMEZCUXl4aFFVRmhMRU5CUVVNc1dVRkJXU3hEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzBsQlEzSkZMRTFCUVUwc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNXVUZCV1N4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8wbEJRM0JGTEUxQlFVMHNXVUZCV1N4SFFVRkhMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzYjBKQlFXOUNMRU5CUVVNc1EwRkJRenRKUVVOd1JTeEpRVUZKTEVWQlFWVXNRMEZCUXp0SlFVTm1MRWxCUVVrc1QwRkJUeXhMUVVGTExFMUJRVTBzUlVGQlJUdFJRVU4wUWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEUkNRVUUwUWl4RFFVRkRMRU5CUVVNN1VVRkRNVU1zUlVGQlJTeEhRVUZITEZkQlFWY3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOMlFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRzFEUVVGdFF5eERRVUZETEVOQlFVTTdTMEZEYkVRN1NVRkRSQ3haUVVGWkxFTkJRVU1zZVVKQlFYbENMRU5CUVVNc1EwRkJRenRKUVVONFF5eEpRVUZKTEU5QlFVOHNTMEZCU3l4TlFVRk5MRVZCUVVVN1VVRkRkRUlzVFVGQlRTeEZRVUZGTEVkQlFVY3NWMEZCVnl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRemRDTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc05rSkJRVFpDTEVWQlFVVXNSMEZCUnl4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTTdVVUZEYWtVc1RVRkJZeXhEUVVGRExGbEJRVmtzUjBGQlJ5eFpRVUZaTEVOQlFVTTdVVUZETlVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGRFZDeHhSVUZCY1VVc1JVRkRja1VzZVVKQlFYbENMRVZCUTNwQ0xFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZMRVZCUTNoQ0xHbEVRVUZwUkN4RFFVTnNSQ3hEUVVGRE8wdEJRMGc3UVVGRFNDeERRVUZETzBGQlFVRXNRMEZCUXlKOSIsImV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvY29va2llLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvZG5zLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL2phdmFzY3JpcHQtaW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9uYXZpZ2F0aW9uLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9odHRwLXBvc3QtcGFyc2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zY2hlbWFcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzWTBGQll5eG5RMEZCWjBNc1EwRkJRenRCUVVNdlF5eGpRVUZqTERaQ1FVRTJRaXhEUVVGRE8wRkJRelZETEdOQlFXTXNPRUpCUVRoQ0xFTkJRVU03UVVGRE4wTXNZMEZCWXl4dlEwRkJiME1zUTBGQlF6dEJRVU51UkN4alFVRmpMRzlEUVVGdlF5eERRVUZETzBGQlEyNUVMR05CUVdNc0swTkJRU3RETEVOQlFVTTdRVUZET1VRc1kwRkJZeXgzUWtGQmQwSXNRMEZCUXp0QlFVTjJReXhqUVVGakxHOUNRVUZ2UWl4RFFVRkRPMEZCUTI1RExHTkJRV01zVlVGQlZTeERRVUZESW4wPSIsIi8qKlxuICogVGhpcyBlbmFibGVzIHVzIHRvIGtlZXAgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIG9yZGVyXG4gKiBpbiB3aGljaCBldmVudHMgYXJyaXZlZCB0byBvdXIgZXZlbnQgbGlzdGVuZXJzLlxuICovXG5sZXQgZXZlbnRPcmRpbmFsID0gMDtcbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCA9ICgpID0+IHtcbiAgICByZXR1cm4gZXZlbnRPcmRpbmFsKys7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN08wZEJSMGM3UVVGRFNDeEpRVUZKTEZsQlFWa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkZja0lzVFVGQlRTeERRVUZETEUxQlFVMHNkVUpCUVhWQ0xFZEJRVWNzUjBGQlJ5eEZRVUZGTzBsQlF6RkRMRTlCUVU4c1dVRkJXU3hGUVVGRkxFTkJRVU03UVVGRGVFSXNRMEZCUXl4RFFVRkRJbjA9IiwiaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi91dWlkXCI7XG4vKipcbiAqIFRoaXMgZW5hYmxlcyB1cyB0byBhY2Nlc3MgYSB1bmlxdWUgcmVmZXJlbmNlIHRvIHRoaXMgYnJvd3NlclxuICogc2Vzc2lvbiAtIHJlZ2VuZXJhdGVkIGFueSB0aW1lIHRoZSBiYWNrZ3JvdW5kIHByb2Nlc3MgZ2V0c1xuICogcmVzdGFydGVkICh3aGljaCBzaG91bGQgb25seSBiZSBvbiBicm93c2VyIHJlc3RhcnRzKVxuICovXG5leHBvcnQgY29uc3QgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgPSBtYWtlVVVJRCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc1VVRkJVU3hGUVVGRkxFMUJRVTBzVVVGQlVTeERRVUZETzBGQlJXeERPenM3TzBkQlNVYzdRVUZEU0N4TlFVRk5MRU5CUVVNc1RVRkJUU3h2UWtGQmIwSXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJReUo5IiwiaW1wb3J0IHsgZXNjYXBlU3RyaW5nLCBVaW50OFRvQmFzZTY0IH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgY2xhc3MgSHR0cFBvc3RQYXJzZXIge1xuICAgIG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICBkYXRhUmVjZWl2ZXI7XG4gICAgY29uc3RydWN0b3Iob25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLCBkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHM7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBwYXJzZVBvc3RSZXF1ZXN0KCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLnJlcXVlc3RCb2R5O1xuICAgICAgICBpZiAocmVxdWVzdEJvZHkuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFwiRXhjZXB0aW9uOiBVcHN0cmVhbSBmYWlsZWQgdG8gcGFyc2UgUE9TVDogXCIgKyByZXF1ZXN0Qm9keS5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcXVlc3RCb2R5LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc3RfYm9keTogZXNjYXBlU3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5LmZvcm1EYXRhKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0Qm9keS5yYXcpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zdF9ib2R5X3JhdzogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkucmF3Lm1hcCgoeCkgPT4gW1xuICAgICAgICAgICAgICAgICAgICB4LmZpbGUsXG4gICAgICAgICAgICAgICAgICAgIFVpbnQ4VG9CYXNlNjQobmV3IFVpbnQ4QXJyYXkoeC5ieXRlcykpLFxuICAgICAgICAgICAgICAgIF0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF3YjNOMExYQmhjbk5sY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZhSFIwY0Mxd2IzTjBMWEJoY25ObGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZEUVN4UFFVRlBMRVZCUVVVc1dVRkJXU3hGUVVGRkxHRkJRV0VzUlVGQlJTeE5RVUZOTEdkQ1FVRm5RaXhEUVVGRE8wRkJVVGRFTEUxQlFVMHNUMEZCVHl4alFVRmpPMGxCUTFJc01rSkJRVEpDTEVOQlFYZERPMGxCUTI1RkxGbEJRVmtzUTBGQlF6dEpRVVU1UWl4WlFVTkZMREpDUVVGclJTeEZRVU5zUlN4WlFVRlpPMUZCUlZvc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4SFFVRkhMREpDUVVFeVFpeERRVUZETzFGQlF5OUVMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETzBsQlEyNURMRU5CUVVNN1NVRkZUU3huUWtGQlowSTdVVUZEY2tJc1RVRkJUU3hYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRExGZEJRVmNzUTBGQlF6dFJRVU5xUlN4SlFVRkpMRmRCUVZjc1EwRkJReXhMUVVGTExFVkJRVVU3V1VGRGNrSXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhSUVVGUkxFTkJRM2hDTERSRFFVRTBReXhIUVVGSExGZEJRVmNzUTBGQlF5eExRVUZMTEVOQlEycEZMRU5CUVVNN1UwRkRTRHRSUVVORUxFbEJRVWtzVjBGQlZ5eERRVUZETEZGQlFWRXNSVUZCUlR0WlFVTjRRaXhQUVVGUE8yZENRVU5NTEZOQlFWTXNSVUZCUlN4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1lVRkRPVVFzUTBGQlF6dFRRVU5JTzFGQlEwUXNTVUZCU1N4WFFVRlhMRU5CUVVNc1IwRkJSeXhGUVVGRk8xbEJRMjVDTEU5QlFVODdaMEpCUTB3c1lVRkJZU3hGUVVGRkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlF6TkNMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenR2UWtGRGVrSXNRMEZCUXl4RFFVRkRMRWxCUVVrN2IwSkJRMDRzWVVGQllTeERRVUZETEVsQlFVa3NWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dHBRa0ZEZGtNc1EwRkJReXhEUVVOSU8yRkJRMFlzUTBGQlF6dFRRVU5JTzFGQlEwUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1NVRkRXaXhEUVVGRE8wTkJRMFlpZlE9PSIsIi8vIEludHJ1bWVudGF0aW9uIGluamVjdGlvbiBjb2RlIGlzIGJhc2VkIG9uIHByaXZhY3liYWRnZXJmaXJlZm94XG4vLyBodHRwczovL2dpdGh1Yi5jb20vRUZGb3JnL3ByaXZhY3liYWRnZXJmaXJlZm94L2Jsb2IvbWFzdGVyL2RhdGEvZmluZ2VycHJpbnRpbmcuanNcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0cnVtZW50SlMoZXZlbnRJZCwgc2VuZE1lc3NhZ2VzVG9Mb2dnZXIpIHtcbiAgICAvKlxuICAgICAqIEluc3RydW1lbnRhdGlvbiBoZWxwZXJzXG4gICAgICogKElubGluZWQgaW4gb3JkZXIgZm9yIGpzSW5zdHJ1bWVudHMgdG8gYmUgZWFzaWx5IGV4cG9ydGFibGUgYXMgYSBzdHJpbmcpXG4gICAgICovXG4gICAgLy8gQ291bnRlciB0byBjYXAgIyBvZiBjYWxscyBsb2dnZWQgZm9yIGVhY2ggc2NyaXB0L2FwaSBjb21iaW5hdGlvblxuICAgIGNvbnN0IG1heExvZ0NvdW50ID0gNTAwO1xuICAgIC8vIGxvZ0NvdW50ZXJcbiAgICBjb25zdCBsb2dDb3VudGVyID0gbmV3IE9iamVjdCgpO1xuICAgIC8vIFByZXZlbnQgbG9nZ2luZyBvZiBnZXRzIGFyaXNpbmcgZnJvbSBsb2dnaW5nXG4gICAgbGV0IGluTG9nID0gZmFsc2U7XG4gICAgLy8gVG8ga2VlcCB0cmFjayBvZiB0aGUgb3JpZ2luYWwgb3JkZXIgb2YgZXZlbnRzXG4gICAgbGV0IG9yZGluYWwgPSAwO1xuICAgIC8vIE9wdGlvbnMgZm9yIEpTT3BlcmF0aW9uXG4gICAgY29uc3QgSlNPcGVyYXRpb24gPSB7XG4gICAgICAgIGNhbGw6IFwiY2FsbFwiLFxuICAgICAgICBnZXQ6IFwiZ2V0XCIsXG4gICAgICAgIGdldF9mYWlsZWQ6IFwiZ2V0KGZhaWxlZClcIixcbiAgICAgICAgZ2V0X2Z1bmN0aW9uOiBcImdldChmdW5jdGlvbilcIixcbiAgICAgICAgc2V0OiBcInNldFwiLFxuICAgICAgICBzZXRfZmFpbGVkOiBcInNldChmYWlsZWQpXCIsXG4gICAgICAgIHNldF9wcmV2ZW50ZWQ6IFwic2V0KHByZXZlbnRlZClcIixcbiAgICB9O1xuICAgIC8vIFJvdWdoIGltcGxlbWVudGF0aW9ucyBvZiBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yIGFuZCBPYmplY3QuZ2V0UHJvcGVydHlOYW1lc1xuICAgIC8vIFNlZSBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmV4dGVuZGVkX29iamVjdF9hcGlcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKHN1YmplY3QsIG5hbWUpIHtcbiAgICAgICAgaWYgKHN1YmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHN1YmplY3QsIG5hbWUpO1xuICAgICAgICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3ViamVjdCk7XG4gICAgICAgIHdoaWxlIChwZCA9PT0gdW5kZWZpbmVkICYmIHByb3RvICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIG5hbWUpO1xuICAgICAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwZDtcbiAgICB9O1xuICAgIE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICAgICAgaWYgKHN1YmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IHByb3BlcnR5IG5hbWVzIGZvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3ViamVjdCk7XG4gICAgICAgIGxldCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdWJqZWN0KTtcbiAgICAgICAgd2hpbGUgKHByb3RvICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiByZW1vdmUgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzIGZyb20gcHJvcHNcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG4gICAgLy8gZGVib3VuY2UgLSBmcm9tIFVuZGVyc2NvcmUgdjEuNi4wXG4gICAgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHRpbWVvdXQ7XG4gICAgICAgIGxldCBhcmdzO1xuICAgICAgICBsZXQgY29udGV4dDtcbiAgICAgICAgbGV0IHRpbWVzdGFtcDtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgY29uc3QgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgZ2VuZXJhdGVzIGEgcGF0aCBmb3IgYW4gZWxlbWVudFxuICAgIGZ1bmN0aW9uIGdldFBhdGhUb0RvbUVsZW1lbnQoZWxlbWVudCwgdmlzaWJpbGl0eUF0dHIgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOVUxML1wiICsgZWxlbWVudC50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nSW5kZXggPSAxO1xuICAgICAgICBjb25zdCBzaWJsaW5ncyA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gc2libGluZ3NbaV07XG4gICAgICAgICAgICBpZiAoc2libGluZyA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gZ2V0UGF0aFRvRG9tRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUsIHZpc2liaWxpdHlBdHRyKTtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiL1wiICsgZWxlbWVudC50YWdOYW1lICsgXCJbXCIgKyBzaWJsaW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5QXR0cikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5oaWRkZW47XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmhyZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggKz0gXCJdXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nLnRhZ05hbWUgPT09IGVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgICAgICAgICAgIHNpYmxpbmdJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhlbHBlciBmb3IgSlNPTmlmeWluZyBvYmplY3RzXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iamVjdCwgc3RyaW5naWZ5RnVuY3Rpb25zID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSGFuZGxlIHBlcm1pc3Npb25zIGVycm9yc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5RnVuY3Rpb25zID8gb2JqZWN0LnRvU3RyaW5nKCkgOiBcIkZVTkNUSU9OXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZWVuT2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeUZ1bmN0aW9ucyA/IHZhbHVlLnRvU3RyaW5nKCkgOiBcIkZVTkNUSU9OXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHdyYXBwaW5nIG9uIGNvbnRlbnQgb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJ3cmFwcGVkSlNPYmplY3RcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS53cmFwcGVkSlNPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU2VyaWFsaXplIERPTSBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFBhdGhUb0RvbUVsZW1lbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2VyaWFsaXphdGlvbiBjeWNsZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJcIiB8fCBzZWVuT2JqZWN0cy5pbmRleE9mKHZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZW5PYmplY3RzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogU0VSSUFMSVpBVElPTiBFUlJPUjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gXCJTRVJJQUxJWkFUSU9OIEVSUk9SOiBcIiArIGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXJBbmRDaGVja0lmT3ZlcihzY3JpcHRVcmwsIHN5bWJvbCkge1xuICAgICAgICBjb25zdCBrZXkgPSBzY3JpcHRVcmwgKyBcInxcIiArIHN5bWJvbDtcbiAgICAgICAgaWYgKGtleSBpbiBsb2dDb3VudGVyICYmIGxvZ0NvdW50ZXJba2V5XSA+PSBtYXhMb2dDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIShrZXkgaW4gbG9nQ291bnRlcikpIHtcbiAgICAgICAgICAgIGxvZ0NvdW50ZXJba2V5XSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dDb3VudGVyW2tleV0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEZvciBnZXRzLCBzZXRzLCBldGMuIG9uIGEgc2luZ2xlIHZhbHVlXG4gICAgZnVuY3Rpb24gbG9nVmFsdWUoaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lLCB2YWx1ZSwgb3BlcmF0aW9uLCAvLyBmcm9tIEpTT3BlcmF0aW9uIG9iamVjdCBwbGVhc2VcbiAgICBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKGluTG9nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5Mb2cgPSB0cnVlO1xuICAgICAgICBjb25zdCBvdmVyTGltaXQgPSB1cGRhdGVDb3VudGVyQW5kQ2hlY2tJZk92ZXIoY2FsbENvbnRleHQuc2NyaXB0VXJsLCBpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUpO1xuICAgICAgICBpZiAob3ZlckxpbWl0KSB7XG4gICAgICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1zZyA9IHtcbiAgICAgICAgICAgIG9wZXJhdGlvbixcbiAgICAgICAgICAgIHN5bWJvbDogaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHNlcmlhbGl6ZU9iamVjdCh2YWx1ZSwgbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzKSxcbiAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgc2NyaXB0TGluZTogY2FsbENvbnRleHQuc2NyaXB0TGluZSxcbiAgICAgICAgICAgIHNjcmlwdENvbDogY2FsbENvbnRleHQuc2NyaXB0Q29sLFxuICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogY2FsbENvbnRleHQuc2NyaXB0TG9jRXZhbCxcbiAgICAgICAgICAgIGNhbGxTdGFjazogY2FsbENvbnRleHQuY2FsbFN0YWNrLFxuICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VuZChcImxvZ1ZhbHVlXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCB2YWx1ZSBsb2chXCIpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIEZvciBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBsb2dDYWxsKGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSwgYXJncywgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmIChpbkxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgb3ZlckxpbWl0ID0gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKGNhbGxDb250ZXh0LnNjcmlwdFVybCwgaW5zdHJ1bWVudGVkRnVuY3Rpb25OYW1lKTtcbiAgICAgICAgaWYgKG92ZXJMaW1pdCkge1xuICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ29udmVydCBzcGVjaWFsIGFyZ3VtZW50cyBhcnJheSB0byBhIHN0YW5kYXJkIGFycmF5IGZvciBKU09OaWZ5aW5nXG4gICAgICAgICAgICBjb25zdCBzZXJpYWxBcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgc2VyaWFsQXJncy5wdXNoKHNlcmlhbGl6ZU9iamVjdChhcmcsIGxvZ1NldHRpbmdzLmxvZ0Z1bmN0aW9uc0FzU3RyaW5ncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogSlNPcGVyYXRpb24uY2FsbCxcbiAgICAgICAgICAgICAgICBzeW1ib2w6IGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBzZXJpYWxBcmdzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHNjcmlwdExpbmU6IGNhbGxDb250ZXh0LnNjcmlwdExpbmUsXG4gICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBjYWxsQ29udGV4dC5zY3JpcHRDb2wsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IGNhbGxDb250ZXh0LnNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBjYWxsQ29udGV4dC5jYWxsU3RhY2ssXG4gICAgICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbmQoXCJsb2dDYWxsXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCBjYWxsIGxvZzogXCIgKyBpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yLCBjb250ZXh0ID0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk9wZW5XUE06IEVycm9yIG5hbWU6IFwiICsgZXJyb3IubmFtZSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPcGVuV1BNOiBFcnJvciBtZXNzYWdlOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiT3BlbldQTTogRXJyb3IgZmlsZW5hbWU6IFwiICsgZXJyb3IuZmlsZU5hbWUpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiT3BlbldQTTogRXJyb3IgbGluZSBudW1iZXI6IFwiICsgZXJyb3IubGluZU51bWJlcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPcGVuV1BNOiBFcnJvciBzdGFjazogXCIgKyBlcnJvci5zdGFjayk7XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT3BlbldQTTogRXJyb3IgY29udGV4dDogXCIgKyBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSGVscGVyIHRvIGdldCBvcmlnaW5hdGluZyBzY3JpcHQgdXJsc1xuICAgIGZ1bmN0aW9uIGdldFN0YWNrVHJhY2UoKSB7XG4gICAgICAgIGxldCBzdGFjaztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGFjaztcbiAgICB9XG4gICAgLy8gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MjAyMTg1XG4gICAgY29uc3QgcnNwbGl0ID0gZnVuY3Rpb24gKHNvdXJjZSwgc2VwLCBtYXhzcGxpdCkge1xuICAgICAgICBjb25zdCBzcGxpdCA9IHNvdXJjZS5zcGxpdChzZXApO1xuICAgICAgICByZXR1cm4gbWF4c3BsaXRcbiAgICAgICAgICAgID8gW3NwbGl0LnNsaWNlKDAsIC1tYXhzcGxpdCkuam9pbihzZXApXS5jb25jYXQoc3BsaXQuc2xpY2UoLW1heHNwbGl0KSlcbiAgICAgICAgICAgIDogc3BsaXQ7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoZ2V0Q2FsbFN0YWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdHJhY2UgPSBnZXRTdGFja1RyYWNlKCkudHJpbSgpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAvLyByZXR1cm4gYSBjb250ZXh0IG9iamVjdCBldmVuIGlmIHRoZXJlIGlzIGFuIGVycm9yXG4gICAgICAgIGNvbnN0IGVtcHR5X2NvbnRleHQgPSB7XG4gICAgICAgICAgICBzY3JpcHRVcmw6IFwiXCIsXG4gICAgICAgICAgICBzY3JpcHRMaW5lOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0Q29sOiBcIlwiLFxuICAgICAgICAgICAgZnVuY05hbWU6IFwiXCIsXG4gICAgICAgICAgICBzY3JpcHRMb2NFdmFsOiBcIlwiLFxuICAgICAgICAgICAgY2FsbFN0YWNrOiBcIlwiLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHJhY2UubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMCwgMSBhbmQgMiBhcmUgT3BlbldQTSdzIG93biBmdW5jdGlvbnMgKGUuZy4gZ2V0U3RhY2tUcmFjZSksIHNraXAgdGhlbS5cbiAgICAgICAgY29uc3QgY2FsbFNpdGUgPSB0cmFjZVszXTtcbiAgICAgICAgaWYgKCFjYWxsU2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgICogU3RhY2sgZnJhbWUgZm9ybWF0IGlzIHNpbXBseTogRlVOQ19OQU1FQEZJTEVOQU1FOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIGV2YWwgb3IgRnVuY3Rpb24gaXMgaW52b2x2ZWQgd2UgaGF2ZSBhbiBhZGRpdGlvbmFsIHBhcnQgYWZ0ZXIgdGhlIEZJTEVOQU1FLCBlLmcuOlxuICAgICAgICAgKiBGVU5DX05BTUVARklMRU5BTUUgbGluZSAxMjMgPiBldmFsIGxpbmUgMSA+IGV2YWw6TElORV9OTzpDT0xVTU5fTk9cbiAgICAgICAgICogb3IgRlVOQ19OQU1FQEZJTEVOQU1FIGxpbmUgMjM0ID4gRnVuY3Rpb246TElORV9OTzpDT0xVTU5fTk9cbiAgICAgICAgICpcbiAgICAgICAgICogV2Ugc3RvcmUgdGhlIHBhcnQgYmV0d2VlbiB0aGUgRklMRU5BTUUgYW5kIHRoZSBMSU5FX05PIGluIHNjcmlwdExvY0V2YWxcbiAgICAgICAgICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0VXJsID0gXCJcIjtcbiAgICAgICAgICAgIGxldCBzY3JpcHRMb2NFdmFsID0gXCJcIjsgLy8gZm9yIGV2YWwgb3IgRnVuY3Rpb24gY2FsbHNcbiAgICAgICAgICAgIGNvbnN0IGNhbGxTaXRlUGFydHMgPSBjYWxsU2l0ZS5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICBjb25zdCBmdW5jTmFtZSA9IGNhbGxTaXRlUGFydHNbMF0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gcnNwbGl0KGNhbGxTaXRlUGFydHNbMV0sIFwiOlwiLCAyKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk5vID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBsaW5lTm8gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdEZpbGVOYW1lID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gM10gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVOb0lkeCA9IHNjcmlwdEZpbGVOYW1lLmluZGV4T2YoXCIgbGluZSBcIik7IC8vIGxpbmUgaW4gdGhlIFVSTCBtZWFucyBldmFsIG9yIEZ1bmN0aW9uXG4gICAgICAgICAgICBpZiAobGluZU5vSWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNjcmlwdFVybCA9IHNjcmlwdEZpbGVOYW1lOyAvLyBUT0RPOiBzb21ldGltZXMgd2UgaGF2ZSBmaWxlbmFtZSBvbmx5LCBlLmcuIFhYLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmwgPSBzY3JpcHRGaWxlTmFtZS5zbGljZSgwLCBsaW5lTm9JZHgpO1xuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWwgPSBzY3JpcHRGaWxlTmFtZS5zbGljZShsaW5lTm9JZHggKyAxLCBzY3JpcHRGaWxlTmFtZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHNjcmlwdExpbmU6IGxpbmVObyxcbiAgICAgICAgICAgICAgICBzY3JpcHRDb2w6IGNvbHVtbk5vLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lLFxuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBnZXRDYWxsU3RhY2sgPyB0cmFjZS5zbGljZSgzKS5qb2luKFwiXFxuXCIpLnRyaW0oKSA6IFwiXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIHBhcnNpbmcgdGhlIHNjcmlwdCBjb250ZXh0XCIsIGUudG9TdHJpbmcoKSwgY2FsbFNpdGUpO1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvcGVydHkgPSBvYmplY3RbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIG51bGwgaXMgdHlwZSBcIm9iamVjdFwiXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9wZXJ0eSA9PT0gXCJvYmplY3RcIjtcbiAgICB9XG4gICAgLy8gTG9nIGNhbGxzIHRvIGEgZ2l2ZW4gZnVuY3Rpb25cbiAgICAvLyBUaGlzIGhlbHBlciBmdW5jdGlvbiByZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgYGZ1bmNgIHdoaWNoIGxvZ3MgY2FsbHNcbiAgICAvLyB0byBgZnVuY2AuIGBvYmplY3ROYW1lYCBhbmQgYG1ldGhvZE5hbWVgIGFyZSB1c2VkIHN0cmljdGx5IHRvIGlkZW50aWZ5XG4gICAgLy8gd2hpY2ggb2JqZWN0IG1ldGhvZCBgZnVuY2AgaXMgY29taW5nIGZyb20gaW4gdGhlIGxvZ3NcbiAgICBmdW5jdGlvbiBpbnN0cnVtZW50RnVuY3Rpb24ob2JqZWN0TmFtZSwgbWV0aG9kTmFtZSwgZnVuYywgbG9nU2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gZ2V0T3JpZ2luYXRpbmdTY3JpcHRDb250ZXh0KGxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayk7XG4gICAgICAgICAgICBsb2dDYWxsKG9iamVjdE5hbWUgKyBcIi5cIiArIG1ldGhvZE5hbWUsIGFyZ3VtZW50cywgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIExvZyBwcm9wZXJ0aWVzIG9mIHByb3RvdHlwZXMgYW5kIG9iamVjdHNcbiAgICBmdW5jdGlvbiBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkob2JqZWN0LCBvYmplY3ROYW1lLCBwcm9wZXJ0eU5hbWUsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmICghb2JqZWN0IHx8XG4gICAgICAgICAgICAhb2JqZWN0TmFtZSB8fFxuICAgICAgICAgICAgIXByb3BlcnR5TmFtZSB8fFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVxdWVzdCB0byBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkuXG4gICAgICAgIE9iamVjdDogJHtvYmplY3R9XG4gICAgICAgIG9iamVjdE5hbWU6ICR7b2JqZWN0TmFtZX1cbiAgICAgICAgcHJvcGVydHlOYW1lOiAke3Byb3BlcnR5TmFtZX1cbiAgICAgICAgYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3RvcmUgb3JpZ2luYWwgZGVzY3JpcHRvciBpbiBjbG9zdXJlXG4gICAgICAgIGNvbnN0IHByb3BEZXNjID0gT2JqZWN0LmdldFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIC8vIFByb3BlcnR5IGRlc2NyaXB0b3IgbXVzdCBleGlzdCB1bmxlc3Mgd2UgYXJlIGluc3RydW1lbnRpbmcgYSBub25FeGlzdGluZyBwcm9wZXJ0eVxuICAgICAgICBpZiAoIXByb3BEZXNjICYmXG4gICAgICAgICAgICAhbG9nU2V0dGluZ3Mubm9uRXhpc3RpbmdQcm9wZXJ0aWVzVG9JbnN0cnVtZW50LmluY2x1ZGVzKHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIG5vdCBmb3VuZCBmb3JcIiwgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBvYmplY3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgIGxldCB1bmRlZmluZWRQcm9wVmFsdWU7XG4gICAgICAgIGNvbnN0IHVuZGVmaW5lZFByb3BEZXNjID0ge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFByb3BWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICAvLyBJbnN0cnVtZW50IGRhdGEgb3IgYWNjZXNzb3IgcHJvcGVydHkgZGVzY3JpcHRvcnNcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxHZXR0ZXIgPSBwcm9wRGVzYyA/IHByb3BEZXNjLmdldCA6IHVuZGVmaW5lZFByb3BEZXNjLmdldDtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTZXR0ZXIgPSBwcm9wRGVzYyA/IHByb3BEZXNjLnNldCA6IHVuZGVmaW5lZFByb3BEZXNjLnNldDtcbiAgICAgICAgbGV0IG9yaWdpbmFsVmFsdWUgPSBwcm9wRGVzYyA/IHByb3BEZXNjLnZhbHVlIDogdW5kZWZpbmVkUHJvcFZhbHVlO1xuICAgICAgICAvLyBXZSBvdmVyd3JpdGUgYm90aCBkYXRhIGFuZCBhY2Nlc3NvciBwcm9wZXJ0aWVzIGFzIGFuIGluc3RydW1lbnRlZFxuICAgICAgICAvLyBhY2Nlc3NvciBwcm9wZXJ0eVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dChsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUgPSBgJHtvYmplY3ROYW1lfS4ke3Byb3BlcnR5TmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb3JpZ2luYWwgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdW5kZWZpbmVkIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSB1bmRlZmluZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3JpZ2luYWxHZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSBvcmlnaW5hbEdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZGF0YSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ1Byb3BlcnR5ID0gb3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFByb3BlcnR5IGRlc2NyaXB0b3IgZm9yICR7aW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lfSBkb2Vzbid0IGhhdmUgZ2V0dGVyIG9yIHZhbHVlP2ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUoaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lLCBcIlwiLCBKU09wZXJhdGlvbi5nZXRfZmFpbGVkLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIExvZyBgZ2V0c2AgZXhjZXB0IHRob3NlIHRoYXQgaGF2ZSBpbnN0cnVtZW50ZWQgcmV0dXJuIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvLyAqIEFsbCByZXR1cm5lZCBmdW5jdGlvbnMgYXJlIGluc3RydW1lbnRlZCB3aXRoIGEgd3JhcHBlclxuICAgICAgICAgICAgICAgICAgICAvLyAqIFJldHVybmVkIG9iamVjdHMgbWF5IGJlIGluc3RydW1lbnRlZCBpZiByZWN1cnNpdmVcbiAgICAgICAgICAgICAgICAgICAgLy8gICBpbnN0cnVtZW50YXRpb24gaXMgZW5hYmxlZCBhbmQgdGhpcyBpc24ndCBhdCB0aGUgZGVwdGggbGltaXQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ1Byb3BlcnR5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2dTZXR0aW5ncy5sb2dGdW5jdGlvbkdldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsIG9yaWdQcm9wZXJ0eSwgSlNPcGVyYXRpb24uZ2V0X2Z1bmN0aW9uLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudGVkRnVuY3Rpb25XcmFwcGVyID0gaW5zdHJ1bWVudEZ1bmN0aW9uKG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgb3JpZ1Byb3BlcnR5LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgYW5kIGNvbnN0cnVjdG9yIHNvIHRoYXQgaW5zdHJ1bWVudGVkIGNsYXNzZXMgcmVtYWluIGludGFjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBtYXkgaGF2ZSBpbnRyb2R1Y2VkIHByb3RvdHlwZSBwb2xsdXRpb24gYXMgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL09wZW5XUE0vaXNzdWVzLzQ3MVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdQcm9wZXJ0eS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVtZW50ZWRGdW5jdGlvbldyYXBwZXIucHJvdG90eXBlID0gb3JpZ1Byb3BlcnR5LnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ1Byb3BlcnR5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVtZW50ZWRGdW5jdGlvbldyYXBwZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdQcm9wZXJ0eS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RydW1lbnRlZEZ1bmN0aW9uV3JhcHBlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3JpZ1Byb3BlcnR5ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5yZWN1cnNpdmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1NldHRpbmdzLmRlcHRoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSwgb3JpZ1Byb3BlcnR5LCBKU09wZXJhdGlvbi5nZXQsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICBzZXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dChsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUgPSBgJHtvYmplY3ROYW1lfS4ke3Byb3BlcnR5TmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2V0cyBmb3IgZnVuY3Rpb25zIGFuZCBvYmplY3RzIGlmIGVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ1NldHRpbmdzLnByZXZlbnRTZXRzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIG9yaWdpbmFsVmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvcmlnaW5hbFZhbHVlID09PSBcIm9iamVjdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUoaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lLCB2YWx1ZSwgSlNPcGVyYXRpb24uc2V0X3ByZXZlbnRlZCwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHZhbHVlIHRvIG9yaWdpbmFsIHNldHRlci9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG9yaWdpbmFsU2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Mb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdC5pc1Byb3RvdHlwZU9mKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUHJvcGVydHkgZGVzY3JpcHRvciBmb3IgJHtpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWV9IGRvZXNuJ3QgaGF2ZSBzZXR0ZXIgb3IgdmFsdWU/YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsIHZhbHVlLCBKU09wZXJhdGlvbi5zZXRfZmFpbGVkLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSwgdmFsdWUsIEpTT3BlcmF0aW9uLnNldCwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudE9iamVjdChvYmplY3QsIGluc3RydW1lbnRlZE5hbWUsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIC8vIFNldCBwcm9wZXJ0aWVzVG9JbnN0cnVtZW50IHRvIG51bGwgdG8gZm9yY2Ugbm8gcHJvcGVydGllcyB0byBiZSBpbnN0cnVtZW50ZWQuXG4gICAgICAgIC8vICh0aGlzIGlzIHVzZWQgaW4gdGVzdGluZyBmb3IgZXhhbXBsZSlcbiAgICAgICAgbGV0IHByb3BlcnRpZXNUb0luc3RydW1lbnQ7XG4gICAgICAgIGlmIChsb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzVG9JbnN0cnVtZW50ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobG9nU2V0dGluZ3MucHJvcGVydGllc1RvSW5zdHJ1bWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNUb0luc3RydW1lbnQgPSBPYmplY3QuZ2V0UHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJvcGVydGllc1RvSW5zdHJ1bWVudCA9IGxvZ1NldHRpbmdzLnByb3BlcnRpZXNUb0luc3RydW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgb2YgcHJvcGVydGllc1RvSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgaWYgKGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmNsdWRlcyhwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBgcmVjdXJzaXZlYCBmbGFnIHNldCB3ZSB3YW50IHRvIHJlY3Vyc2l2ZWx5IGluc3RydW1lbnQgYW55XG4gICAgICAgICAgICAvLyBvYmplY3QgcHJvcGVydGllcyB0aGF0IGFyZW4ndCB0aGUgcHJvdG90eXBlIG9iamVjdC5cbiAgICAgICAgICAgIGlmIChsb2dTZXR0aW5ncy5yZWN1cnNpdmUgJiZcbiAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5kZXB0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICBpc09iamVjdChvYmplY3QsIHByb3BlcnR5TmFtZSkgJiZcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUgIT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0cnVtZW50ZWROYW1lID0gYCR7aW5zdHJ1bWVudGVkTmFtZX0uJHtwcm9wZXJ0eU5hbWV9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdMb2dTZXR0aW5ncyA9IHsgLi4ubG9nU2V0dGluZ3MgfTtcbiAgICAgICAgICAgICAgICBuZXdMb2dTZXR0aW5ncy5kZXB0aCA9IGxvZ1NldHRpbmdzLmRlcHRoIC0gMTtcbiAgICAgICAgICAgICAgICBuZXdMb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50ID0gW107XG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdChvYmplY3RbcHJvcGVydHlOYW1lXSwgbmV3SW5zdHJ1bWVudGVkTmFtZSwgbmV3TG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkob2JqZWN0LCBpbnN0cnVtZW50ZWROYW1lLCBwcm9wZXJ0eU5hbWUsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiY2FuJ3QgcmVkZWZpbmUgbm9uLWNvbmZpZ3VyYWJsZSBwcm9wZXJ0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENhbm5vdCBpbnN0cnVtZW50IG5vbi1jb25maWd1cmFibGUgcHJvcGVydHk6ICR7aW5zdHJ1bWVudGVkTmFtZX06JHtwcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dFcnJvclRvQ29uc29sZShlcnJvciwgeyBpbnN0cnVtZW50ZWROYW1lLCBwcm9wZXJ0eU5hbWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIGxvZ1NldHRpbmdzLm5vbkV4aXN0aW5nUHJvcGVydGllc1RvSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgaWYgKGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmNsdWRlcyhwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIGluc3RydW1lbnRlZE5hbWUsIHByb3BlcnR5TmFtZSwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IsIHsgaW5zdHJ1bWVudGVkTmFtZSwgcHJvcGVydHlOYW1lIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNlbmRGYWN0b3J5ID0gZnVuY3Rpb24gKGV2ZW50SWQsICRzZW5kTWVzc2FnZXNUb0xvZ2dlcikge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgLy8gZGVib3VuY2Ugc2VuZGluZyBxdWV1ZWQgbWVzc2FnZXNcbiAgICAgICAgY29uc3QgX3NlbmQgPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2VuZE1lc3NhZ2VzVG9Mb2dnZXIoZXZlbnRJZCwgbWVzc2FnZXMpO1xuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICAgICAgICBtZXNzYWdlcyA9IFtdO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1zZ1R5cGUsIG1zZykge1xuICAgICAgICAgICAgLy8gcXVldWUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goeyB0eXBlOiBtc2dUeXBlLCBjb250ZW50OiBtc2cgfSk7XG4gICAgICAgICAgICBfc2VuZCgpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgY29uc3Qgc2VuZCA9IHNlbmRGYWN0b3J5KGV2ZW50SWQsIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKTtcbiAgICBmdW5jdGlvbiBpbnN0cnVtZW50SlMoSlNJbnN0cnVtZW50UmVxdWVzdHMpIHtcbiAgICAgICAgLy8gVGhlIEpTIEluc3RydW1lbnQgUmVxdWVzdHMgYXJlIHNldHVwIGFuZCB2YWxpZGF0ZWQgcHl0aG9uIHNpZGVcbiAgICAgICAgLy8gaW5jbHVkaW5nIHNldHRpbmcgZGVmYXVsdHMgZm9yIGxvZ1NldHRpbmdzLlxuICAgICAgICAvLyBNb3JlIGRldGFpbHMgYWJvdXQgaG93IHRoaXMgZnVuY3Rpb24gaXMgaW52b2tlZCBhcmUgaW5cbiAgICAgICAgLy8gY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS50c1xuICAgICAgICBKU0luc3RydW1lbnRSZXF1ZXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpbnN0cnVtZW50T2JqZWN0KGV2YWwoaXRlbS5vYmplY3QpLCBpdGVtLmluc3RydW1lbnRlZE5hbWUsIGl0ZW0ubG9nU2V0dGluZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVGhpcyB3aG9sZSBmdW5jdGlvbiBnZXRJbnN0cnVtZW50SlMgcmV0dXJucyBqdXN0IHRoZSBmdW5jdGlvbiBgaW5zdHJ1bWVudEpTYC5cbiAgICByZXR1cm4gaW5zdHJ1bWVudEpTO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW5NdGFXNXpkSEoxYldWdWRITXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZiR2xpTDJwekxXbHVjM1J5ZFcxbGJuUnpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxHbEZRVUZwUlR0QlFVTnFSU3h2UmtGQmIwWTdRVUU0UW5CR0xFMUJRVTBzVlVGQlZTeGxRVUZsTEVOQlFVTXNUMEZCWlN4RlFVRkZMRzlDUVVGdlFqdEpRVU51UlRzN08wOUJSMGM3U1VGRlNDeHRSVUZCYlVVN1NVRkRia1VzVFVGQlRTeFhRVUZYTEVkQlFVY3NSMEZCUnl4RFFVRkRPMGxCUTNoQ0xHRkJRV0U3U1VGRFlpeE5RVUZOTEZWQlFWVXNSMEZCUnl4SlFVRkpMRTFCUVUwc1JVRkJSU3hEUVVGRE8wbEJRMmhETEN0RFFVRXJRenRKUVVNdlF5eEpRVUZKTEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNN1NVRkRiRUlzWjBSQlFXZEVPMGxCUTJoRUxFbEJRVWtzVDBGQlR5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVVm9RaXd3UWtGQk1FSTdTVUZETVVJc1RVRkJUU3hYUVVGWExFZEJRVWM3VVVGRGJFSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1VVRkRXaXhIUVVGSExFVkJRVVVzUzBGQlN6dFJRVU5XTEZWQlFWVXNSVUZCUlN4aFFVRmhPMUZCUTNwQ0xGbEJRVmtzUlVGQlJTeGxRVUZsTzFGQlF6ZENMRWRCUVVjc1JVRkJSU3hMUVVGTE8xRkJRMVlzVlVGQlZTeEZRVUZGTEdGQlFXRTdVVUZEZWtJc1lVRkJZU3hGUVVGRkxHZENRVUZuUWp0TFFVTm9ReXhEUVVGRE8wbEJSVVlzYjBaQlFXOUdPMGxCUTNCR0xIbEZRVUY1UlR0SlFVTjZSU3hOUVVGTkxFTkJRVU1zY1VKQlFYRkNMRWRCUVVjc1ZVRkJWU3hQUVVGUExFVkJRVVVzU1VGQlNUdFJRVU53UkN4SlFVRkpMRTlCUVU4c1MwRkJTeXhUUVVGVExFVkJRVVU3V1VGRGVrSXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXcyUTBGQk5rTXNRMEZCUXl4RFFVRkRPMU5CUTJoRk8xRkJRMFFzU1VGQlNTeEZRVUZGTEVkQlFVY3NUVUZCVFN4RFFVRkRMSGRDUVVGM1FpeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFJDeEpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6TkRMRTlCUVU4c1JVRkJSU3hMUVVGTExGTkJRVk1zU1VGQlNTeExRVUZMTEV0QlFVc3NTVUZCU1N4RlFVRkZPMWxCUTNwRExFVkJRVVVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNkMEpCUVhkQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RUxFdEJRVXNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJRM1JETzFGQlEwUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1NVRkRXaXhEUVVGRExFTkJRVU03U1VGRlJpeE5RVUZOTEVOQlFVTXNaMEpCUVdkQ0xFZEJRVWNzVlVGQlZTeFBRVUZQTzFGQlEzcERMRWxCUVVrc1QwRkJUeXhMUVVGTExGTkJRVk1zUlVGQlJUdFpRVU42UWl4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVGRExIZERRVUYzUXl4RFFVRkRMRU5CUVVNN1UwRkRNMFE3VVVGRFJDeEpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRhRVFzU1VGQlNTeExRVUZMTEVkQlFVY3NUVUZCVFN4RFFVRkRMR05CUVdNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU16UXl4UFFVRlBMRXRCUVVzc1MwRkJTeXhKUVVGSkxFVkJRVVU3V1VGRGNrSXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZUVRc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1UwRkRkRU03VVVGRFJDeHZSRUZCYjBRN1VVRkRjRVFzVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEWml4RFFVRkRMRU5CUVVNN1NVRkZSaXh2UTBGQmIwTTdTVUZEY0VNc1UwRkJVeXhSUVVGUkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WlFVRnhRaXhMUVVGTE8xRkJRM1JFTEVsQlFVa3NUMEZCVHl4RFFVRkRPMUZCUTFvc1NVRkJTU3hKUVVGSkxFTkJRVU03VVVGRFZDeEpRVUZKTEU5QlFVOHNRMEZCUXp0UlFVTmFMRWxCUVVrc1UwRkJVeXhEUVVGRE8xRkJRMlFzU1VGQlNTeE5RVUZOTEVOQlFVTTdVVUZGV0N4TlFVRk5MRXRCUVVzc1IwRkJSenRaUVVOYUxFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhUUVVGVExFTkJRVU03V1VGRGNFTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hGUVVGRk8yZENRVU5tTEU5QlFVOHNSMEZCUnl4VlFVRlZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXp0aFFVTXhRenRwUWtGQlRUdG5Ra0ZEVEN4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRE8yZENRVU5tTEVsQlFVa3NRMEZCUXl4VFFVRlRMRVZCUVVVN2IwSkJRMlFzVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzI5Q1FVTnVReXhQUVVGUExFZEJRVWNzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXp0cFFrRkRka0k3WVVGRFJqdFJRVU5JTEVOQlFVTXNRMEZCUXp0UlFVVkdMRTlCUVU4N1dVRkRUQ3hQUVVGUExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlEyWXNTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRaUVVOcVFpeFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xbEJRM1pDTEUxQlFVMHNUMEZCVHl4SFFVRkhMRk5CUVZNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFpRVU4wUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRk8yZENRVU5hTEU5QlFVOHNSMEZCUnl4VlFVRlZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzJGQlEyNURPMWxCUTBRc1NVRkJTU3hQUVVGUExFVkJRVVU3WjBKQlExZ3NUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOdVF5eFBRVUZQTEVkQlFVY3NTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRoUVVOMlFqdFpRVVZFTEU5QlFVOHNUVUZCVFN4RFFVRkRPMUZCUTJoQ0xFTkJRVU1zUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGUkN3NFEwRkJPRU03U1VGRE9VTXNVMEZCVXl4dFFrRkJiVUlzUTBGQlF5eFBRVUZaTEVWQlFVVXNhVUpCUVRCQ0xFdEJRVXM3VVVGRGVFVXNTVUZCU1N4UFFVRlBMRXRCUVVzc1VVRkJVU3hEUVVGRExFbEJRVWtzUlVGQlJUdFpRVU0zUWl4UFFVRlBMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU03VTBGRGVFSTdVVUZEUkN4SlFVRkpMRTlCUVU4c1EwRkJReXhWUVVGVkxFdEJRVXNzU1VGQlNTeEZRVUZGTzFsQlF5OUNMRTlCUVU4c1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTTdVMEZEYkVNN1VVRkZSQ3hKUVVGSkxGbEJRVmtzUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZEY2tJc1RVRkJUU3hSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRMME1zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1dVRkRlRU1zVFVGQlRTeFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRelZDTEVsQlFVa3NUMEZCVHl4TFFVRkxMRTlCUVU4c1JVRkJSVHRuUWtGRGRrSXNTVUZCU1N4SlFVRkpMRWRCUVVjc2JVSkJRVzFDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVZVc1JVRkJSU3hqUVVGakxFTkJRVU1zUTBGQlF6dG5Ra0ZEYmtVc1NVRkJTU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUMEZCVHl4SFFVRkhMRWRCUVVjc1IwRkJSeXhaUVVGWkxFTkJRVU03WjBKQlEyNUVMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVXNRMEZCUXp0blFrRkRla0lzU1VGQlNTeEpRVUZKTEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8yZENRVU5vUXl4SlFVRkpMR05CUVdNc1JVRkJSVHR2UWtGRGJFSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETzI5Q1FVTTNRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8yOUNRVU53UXl4SlFVRkpMRWxCUVVrc1IwRkJSeXhIUVVGSExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRPMmxDUVVONFF6dG5Ra0ZEUkN4SlFVRkpMRTlCUVU4c1EwRkJReXhQUVVGUExFdEJRVXNzUjBGQlJ5eEZRVUZGTzI5Q1FVTXpRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNN2FVSkJRelZDTzJkQ1FVTkVMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU03WjBKQlExb3NUMEZCVHl4SlFVRkpMRU5CUVVNN1lVRkRZanRaUVVORUxFbEJRVWtzVDBGQlR5eERRVUZETEZGQlFWRXNTMEZCU3l4RFFVRkRMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUzBGQlN5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkZPMmRDUVVOcVJTeFpRVUZaTEVWQlFVVXNRMEZCUXp0aFFVTm9RanRUUVVOR08wbEJRMGdzUTBGQlF6dEpRVVZFTEdkRFFVRm5RenRKUVVOb1F5eFRRVUZUTEdWQlFXVXNRMEZEZEVJc1RVRkJUU3hGUVVOT0xIRkNRVUU0UWl4TFFVRkxPMUZCUlc1RExEUkNRVUUwUWp0UlFVTTFRaXhKUVVGSk8xbEJRMFlzU1VGQlNTeE5RVUZOTEV0QlFVc3NTVUZCU1N4RlFVRkZPMmRDUVVOdVFpeFBRVUZQTEUxQlFVMHNRMEZCUXp0aFFVTm1PMWxCUTBRc1NVRkJTU3hQUVVGUExFMUJRVTBzUzBGQlN5eFZRVUZWTEVWQlFVVTdaMEpCUTJoRExFOUJRVThzYTBKQlFXdENMRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRE8yRkJRelZFTzFsQlEwUXNTVUZCU1N4UFFVRlBMRTFCUVUwc1MwRkJTeXhSUVVGUkxFVkJRVVU3WjBKQlF6bENMRTlCUVU4c1RVRkJUU3hEUVVGRE8yRkJRMlk3V1VGRFJDeE5RVUZOTEZkQlFWY3NSMEZCUnl4RlFVRkZMRU5CUVVNN1dVRkRka0lzVDBGQlR5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hWUVVGVkxFZEJRVWNzUlVGQlJTeExRVUZMTzJkQ1FVTm9SQ3hKUVVGSkxFdEJRVXNzUzBGQlN5eEpRVUZKTEVWQlFVVTdiMEpCUTJ4Q0xFOUJRVThzVFVGQlRTeERRVUZETzJsQ1FVTm1PMmRDUVVORUxFbEJRVWtzVDBGQlR5eExRVUZMTEV0QlFVc3NWVUZCVlN4RlFVRkZPMjlDUVVNdlFpeFBRVUZQTEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF6dHBRa0ZETTBRN1owSkJRMFFzU1VGQlNTeFBRVUZQTEV0QlFVc3NTMEZCU3l4UlFVRlJMRVZCUVVVN2IwSkJRemRDTEhGRFFVRnhRenR2UWtGRGNrTXNTVUZCU1N4cFFrRkJhVUlzU1VGQlNTeExRVUZMTEVWQlFVVTdkMEpCUXpsQ0xFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTXNaVUZCWlN4RFFVRkRPM0ZDUVVNdlFqdHZRa0ZGUkN4NVFrRkJlVUk3YjBKQlEzcENMRWxCUVVrc1MwRkJTeXhaUVVGWkxGZEJRVmNzUlVGQlJUdDNRa0ZEYUVNc1QwRkJUeXh0UWtGQmJVSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenR4UWtGRGJrTTdiMEpCUlVRc0swSkJRU3RDTzI5Q1FVTXZRaXhKUVVGSkxFZEJRVWNzUzBGQlN5eEZRVUZGTEVsQlFVa3NWMEZCVnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVTdkMEpCUTJoRUxGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2QwSkJRM2hDTEU5QlFVOHNTMEZCU3l4RFFVRkRPM0ZDUVVOa08zbENRVUZOTzNkQ1FVTk1MRTlCUVU4c1QwRkJUeXhMUVVGTExFTkJRVU03Y1VKQlEzSkNPMmxDUVVOR08yZENRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkRPMWxCUTJZc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRFNqdFJRVUZETEU5QlFVOHNTMEZCU3l4RlFVRkZPMWxCUTJRc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eG5RMEZCWjBNc1IwRkJSeXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU4wUkN4UFFVRlBMSFZDUVVGMVFpeEhRVUZITEV0QlFVc3NRMEZCUXp0VFFVTjRRenRKUVVOSUxFTkJRVU03U1VGRlJDeFRRVUZUTERKQ1FVRXlRaXhEUVVGRExGTkJRVk1zUlVGQlJTeE5RVUZOTzFGQlEzQkVMRTFCUVUwc1IwRkJSeXhIUVVGSExGTkJRVk1zUjBGQlJ5eEhRVUZITEVkQlFVY3NUVUZCVFN4RFFVRkRPMUZCUTNKRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEZWQlFWVXNTVUZCU1N4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzVjBGQlZ5eEZRVUZGTzFsQlEzWkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8xTkJRMkk3WVVGQlRTeEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1ZVRkJWU3hEUVVGRExFVkJRVVU3V1VGREwwSXNWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFRRVU55UWp0aFFVRk5PMWxCUTB3c1ZVRkJWU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTjBRanRSUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMSGxEUVVGNVF6dEpRVU42UXl4VFFVRlRMRkZCUVZFc1EwRkRaaXgzUWtGQlowTXNSVUZEYUVNc1MwRkJWU3hGUVVOV0xGTkJRV2xDTEVWQlFVVXNhVU5CUVdsRE8wbEJRM0JFTEZkQlFXZENMRVZCUTJoQ0xGZEJRWGRDTzFGQlJYaENMRWxCUVVrc1MwRkJTeXhGUVVGRk8xbEJRMVFzVDBGQlR6dFRRVU5TTzFGQlEwUXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVWaUxFMUJRVTBzVTBGQlV5eEhRVUZITERKQ1FVRXlRaXhEUVVNelF5eFhRVUZYTEVOQlFVTXNVMEZCVXl4RlFVTnlRaXgzUWtGQmQwSXNRMEZEZWtJc1EwRkJRenRSUVVOR0xFbEJRVWtzVTBGQlV5eEZRVUZGTzFsQlEySXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRaUVVOa0xFOUJRVTg3VTBGRFVqdFJRVVZFTEUxQlFVMHNSMEZCUnl4SFFVRkhPMWxCUTFZc1UwRkJVenRaUVVOVUxFMUJRVTBzUlVGQlJTeDNRa0ZCZDBJN1dVRkRhRU1zUzBGQlN5eEZRVUZGTEdWQlFXVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1YwRkJWeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRPMWxCUTJoRkxGTkJRVk1zUlVGQlJTeFhRVUZYTEVOQlFVTXNVMEZCVXp0WlFVTm9ReXhWUVVGVkxFVkJRVVVzVjBGQlZ5eERRVUZETEZWQlFWVTdXVUZEYkVNc1UwRkJVeXhGUVVGRkxGZEJRVmNzUTBGQlF5eFRRVUZUTzFsQlEyaERMRkZCUVZFc1JVRkJSU3hYUVVGWExFTkJRVU1zVVVGQlVUdFpRVU01UWl4aFFVRmhMRVZCUVVVc1YwRkJWeXhEUVVGRExHRkJRV0U3V1VGRGVFTXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8xbEJRMmhETEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVN1UwRkRia0lzUTBGQlF6dFJRVVZHTEVsQlFVazdXVUZEUml4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFOQlEzWkNPMUZCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3V1VGRFpDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMR3REUVVGclF5eERRVUZETEVOQlFVTTdXVUZEYUVRc2FVSkJRV2xDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1UwRkRNVUk3VVVGRlJDeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPMGxCUTJoQ0xFTkJRVU03U1VGRlJDeG5Ra0ZCWjBJN1NVRkRhRUlzVTBGQlV5eFBRVUZQTEVOQlEyUXNkMEpCUVdkRExFVkJRMmhETEVsQlFXZENMRVZCUTJoQ0xGZEJRV2RDTEVWQlEyaENMRmRCUVhkQ08xRkJSWGhDTEVsQlFVa3NTMEZCU3l4RlFVRkZPMWxCUTFRc1QwRkJUenRUUVVOU08xRkJRMFFzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVVmlMRTFCUVUwc1UwRkJVeXhIUVVGSExESkNRVUV5UWl4RFFVTXpReXhYUVVGWExFTkJRVU1zVTBGQlV5eEZRVU55UWl4M1FrRkJkMElzUTBGRGVrSXNRMEZCUXp0UlFVTkdMRWxCUVVrc1UwRkJVeXhGUVVGRk8xbEJRMklzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTmtMRTlCUVU4N1UwRkRVanRSUVVWRUxFbEJRVWs3V1VGRFJpeHhSVUZCY1VVN1dVRkRja1VzVFVGQlRTeFZRVUZWTEVkQlFXRXNSVUZCUlN4RFFVRkRPMWxCUTJoRExFdEJRVXNzVFVGQlRTeEhRVUZITEVsQlFVa3NTVUZCU1N4RlFVRkZPMmRDUVVOMFFpeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVTmlMR1ZCUVdVc1EwRkJReXhIUVVGSExFVkJRVVVzVjBGQlZ5eERRVUZETEhGQ1FVRnhRaXhEUVVGRExFTkJRM2hFTEVOQlFVTTdZVUZEU0R0WlFVTkVMRTFCUVUwc1IwRkJSeXhIUVVGSE8yZENRVU5XTEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1NVRkJTVHRuUWtGRE0wSXNUVUZCVFN4RlFVRkZMSGRDUVVGM1FqdG5Ra0ZEYUVNc1NVRkJTU3hGUVVGRkxGVkJRVlU3WjBKQlEyaENMRXRCUVVzc1JVRkJSU3hGUVVGRk8yZENRVU5VTEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1UwRkJVenRuUWtGRGFFTXNWVUZCVlN4RlFVRkZMRmRCUVZjc1EwRkJReXhWUVVGVk8yZENRVU5zUXl4VFFVRlRMRVZCUVVVc1YwRkJWeXhEUVVGRExGTkJRVk03WjBKQlEyaERMRkZCUVZFc1JVRkJSU3hYUVVGWExFTkJRVU1zVVVGQlVUdG5Ra0ZET1VJc1lVRkJZU3hGUVVGRkxGZEJRVmNzUTBGQlF5eGhRVUZoTzJkQ1FVTjRReXhUUVVGVExFVkJRVVVzVjBGQlZ5eERRVUZETEZOQlFWTTdaMEpCUTJoRExFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVTdZVUZEYmtJc1EwRkJRenRaUVVOR0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRkRUk3VVVGQlF5eFBRVUZQTEV0QlFVc3NSVUZCUlR0WlFVTmtMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRMVFzYTBOQlFXdERMRWRCUVVjc2QwSkJRWGRDTEVOQlF6bEVMRU5CUVVNN1dVRkRSaXhwUWtGQmFVSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVNeFFqdFJRVU5FTEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNN1NVRkRhRUlzUTBGQlF6dEpRVVZFTEZOQlFWTXNhVUpCUVdsQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTEZWQlFXVXNTMEZCU3p0UlFVTndSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEhWQ1FVRjFRaXhIUVVGSExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTndSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETERCQ1FVRXdRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTXhSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETERKQ1FVRXlRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTTFSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETERoQ1FVRTRRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTnFSU3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEhkQ1FVRjNRaXhIUVVGSExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTjBSQ3hKUVVGSkxFOUJRVThzUlVGQlJUdFpRVU5ZTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc01FSkJRVEJDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEzSkZPMGxCUTBnc1EwRkJRenRKUVVWRUxIZERRVUYzUXp0SlFVTjRReXhUUVVGVExHRkJRV0U3VVVGRGNFSXNTVUZCU1N4TFFVRkxMRU5CUVVNN1VVRkZWaXhKUVVGSk8xbEJRMFlzVFVGQlRTeEpRVUZKTEV0QlFVc3NSVUZCUlN4RFFVRkRPMU5CUTI1Q08xRkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVVTdXVUZEV2l4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF6dFRRVU51UWp0UlFVVkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVVZFTERCRFFVRXdRenRKUVVNeFF5eE5RVUZOTEUxQlFVMHNSMEZCUnl4VlFVRlZMRTFCUVdNc1JVRkJSU3hIUVVGSExFVkJRVVVzVVVGQlVUdFJRVU53UkN4TlFVRk5MRXRCUVVzc1IwRkJSeXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTJoRExFOUJRVThzVVVGQlVUdFpRVU5pTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0WlFVTjBSU3hEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETzBsQlExb3NRMEZCUXl4RFFVRkRPMGxCUlVZc1UwRkJVeXd5UWtGQk1rSXNRMEZCUXl4WlFVRlpMRWRCUVVjc1MwRkJTenRSUVVOMlJDeE5RVUZOTEV0QlFVc3NSMEZCUnl4aFFVRmhMRVZCUVVVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRha1FzYjBSQlFXOUVPMUZCUTNCRUxFMUJRVTBzWVVGQllTeEhRVUZITzFsQlEzQkNMRk5CUVZNc1JVRkJSU3hGUVVGRk8xbEJRMklzVlVGQlZTeEZRVUZGTEVWQlFVVTdXVUZEWkN4VFFVRlRMRVZCUVVVc1JVRkJSVHRaUVVOaUxGRkJRVkVzUlVGQlJTeEZRVUZGTzFsQlExb3NZVUZCWVN4RlFVRkZMRVZCUVVVN1dVRkRha0lzVTBGQlV5eEZRVUZGTEVWQlFVVTdVMEZEWkN4RFFVRkRPMUZCUTBZc1NVRkJTU3hMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVTndRaXhQUVVGUExHRkJRV0VzUTBGQlF6dFRRVU4wUWp0UlFVTkVMREJGUVVFd1JUdFJRVU14UlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZETVVJc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJUdFpRVU5pTEU5QlFVOHNZVUZCWVN4RFFVRkRPMU5CUTNSQ08xRkJRMFE3T3pzN096czdPMWRCVVVjN1VVRkRTQ3hKUVVGSk8xbEJRMFlzU1VGQlNTeFRRVUZUTEVkQlFVY3NSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFbEJRVWtzWVVGQllTeEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRFpDUVVFMlFqdFpRVU55UkN4TlFVRk5MR0ZCUVdFc1IwRkJSeXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUXpGRExFMUJRVTBzVVVGQlVTeEhRVUZITEdGQlFXRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRGVFTXNUVUZCVFN4TFFVRkxMRWRCUVVjc1RVRkJUU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGREwwTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRla01zVFVGQlRTeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZGtNc1RVRkJUU3hqUVVGakxFZEJRVWNzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlEzSkVMRTFCUVUwc1UwRkJVeXhIUVVGSExHTkJRV01zUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXg1UTBGQmVVTTdXVUZETjBZc1NVRkJTU3hUUVVGVExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTNCQ0xGTkJRVk1zUjBGQlJ5eGpRVUZqTEVOQlFVTXNRMEZCUXl4dlJFRkJiMFE3WVVGRGFrWTdhVUpCUVUwN1owSkJRMHdzVTBGQlV5eEhRVUZITEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRkxGTkJRVk1zUTBGQlF5eERRVUZETzJkQ1FVTXZReXhoUVVGaExFZEJRVWNzWTBGQll5eERRVUZETEV0QlFVc3NRMEZEYkVNc1UwRkJVeXhIUVVGSExFTkJRVU1zUlVGRFlpeGpRVUZqTEVOQlFVTXNUVUZCVFN4RFFVTjBRaXhEUVVGRE8yRkJRMGc3V1VGRFJDeE5RVUZOTEZkQlFWY3NSMEZCUnp0blFrRkRiRUlzVTBGQlV6dG5Ra0ZEVkN4VlFVRlZMRVZCUVVVc1RVRkJUVHRuUWtGRGJFSXNVMEZCVXl4RlFVRkZMRkZCUVZFN1owSkJRMjVDTEZGQlFWRTdaMEpCUTFJc1lVRkJZVHRuUWtGRFlpeFRRVUZUTEVWQlFVVXNXVUZCV1N4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSVHRoUVVOb1JTeERRVUZETzFsQlEwWXNUMEZCVHl4WFFVRlhMRU5CUVVNN1UwRkRjRUk3VVVGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0WlFVTldMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRMVFzTWtOQlFUSkRMRVZCUXpORExFTkJRVU1zUTBGQlF5eFJRVUZSTEVWQlFVVXNSVUZEV2l4UlFVRlJMRU5CUTFRc1EwRkJRenRaUVVOR0xFOUJRVThzWVVGQllTeERRVUZETzFOQlEzUkNPMGxCUTBnc1EwRkJRenRKUVVWRUxGTkJRVk1zVVVGQlVTeERRVUZETEUxQlFVMHNSVUZCUlN4WlFVRlpPMUZCUTNCRExFbEJRVWtzVVVGQlVTeERRVUZETzFGQlEySXNTVUZCU1R0WlFVTkdMRkZCUVZFc1IwRkJSeXhOUVVGTkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTTdVMEZEYWtNN1VVRkJReXhQUVVGUExFdEJRVXNzUlVGQlJUdFpRVU5rTEU5QlFVOHNTMEZCU3l4RFFVRkRPMU5CUTJRN1VVRkRSQ3hKUVVGSkxGRkJRVkVzUzBGQlN5eEpRVUZKTEVWQlFVVTdXVUZEY2tJc2QwSkJRWGRDTzFsQlEzaENMRTlCUVU4c1MwRkJTeXhEUVVGRE8xTkJRMlE3VVVGRFJDeFBRVUZQTEU5QlFVOHNVVUZCVVN4TFFVRkxMRkZCUVZFc1EwRkJRenRKUVVOMFF5eERRVUZETzBsQlJVUXNaME5CUVdkRE8wbEJRMmhETEhkRlFVRjNSVHRKUVVONFJTeDVSVUZCZVVVN1NVRkRla1VzZDBSQlFYZEVPMGxCUTNoRUxGTkJRVk1zYTBKQlFXdENMRU5CUTNwQ0xGVkJRV3RDTEVWQlEyeENMRlZCUVd0Q0xFVkJRMnhDTEVsQlFWTXNSVUZEVkN4WFFVRjNRanRSUVVWNFFpeFBRVUZQTzFsQlEwd3NUVUZCVFN4WFFVRlhMRWRCUVVjc01rSkJRVEpDTEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xbEJRekZGTEU5QlFVOHNRMEZEVEN4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGVkJRVlVzUlVGRE4wSXNVMEZCVXl4RlFVTlVMRmRCUVZjc1JVRkRXQ3hYUVVGWExFTkJRMW9zUTBGQlF6dFpRVU5HTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEY2tNc1EwRkJReXhEUVVGRE8wbEJRMG9zUTBGQlF6dEpRVVZFTERKRFFVRXlRenRKUVVNelF5eFRRVUZUTEhkQ1FVRjNRaXhEUVVNdlFpeE5RVUZOTEVWQlEwNHNWVUZCYTBJc1JVRkRiRUlzV1VGQmIwSXNSVUZEY0VJc1YwRkJkMEk3VVVGRmVFSXNTVUZEUlN4RFFVRkRMRTFCUVUwN1dVRkRVQ3hEUVVGRExGVkJRVlU3V1VGRFdDeERRVUZETEZsQlFWazdXVUZEWWl4WlFVRlpMRXRCUVVzc1YwRkJWeXhGUVVNMVFqdFpRVU5CTEUxQlFVMHNTVUZCU1N4TFFVRkxMRU5CUTJJN2EwSkJRMVVzVFVGQlRUdHpRa0ZEUml4VlFVRlZPM2RDUVVOU0xGbEJRVms3VTBGRE0wSXNRMEZEUml4RFFVRkRPMU5CUTBnN1VVRkZSQ3gxUTBGQmRVTTdVVUZEZGtNc1RVRkJUU3hSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETEhGQ1FVRnhRaXhEUVVGRExFMUJRVTBzUlVGQlJTeFpRVUZaTEVOQlFVTXNRMEZCUXp0UlFVVndSU3h2UmtGQmIwWTdVVUZEY0VZc1NVRkRSU3hEUVVGRExGRkJRVkU3V1VGRFZDeERRVUZETEZkQlFWY3NRMEZCUXl4cFEwRkJhVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRVZCUTNKRk8xbEJRMEVzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZEV0N4dFEwRkJiVU1zUlVGRGJrTXNWVUZCVlN4RlFVTldMRmxCUVZrc1JVRkRXaXhOUVVGTkxFTkJRMUFzUTBGQlF6dFpRVU5HTEU5QlFVODdVMEZEVWp0UlFVVkVMQ3REUVVFclF6dFJRVU12UXl4SlFVRkpMR3RDUVVGclFpeERRVUZETzFGQlEzWkNMRTFCUVUwc2FVSkJRV2xDTEVkQlFVYzdXVUZEZUVJc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJUdG5Ra0ZEVWl4UFFVRlBMR3RDUVVGclFpeERRVUZETzFsQlF6VkNMRU5CUVVNN1dVRkRSQ3hIUVVGSExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNSVUZCUlR0blFrRkRZaXhyUWtGQmEwSXNSMEZCUnl4TFFVRkxMRU5CUVVNN1dVRkROMElzUTBGQlF6dFpRVU5FTEZWQlFWVXNSVUZCUlN4TFFVRkxPMU5CUTJ4Q0xFTkJRVU03VVVGRlJpeHRSRUZCYlVRN1VVRkRia1FzVFVGQlRTeGpRVUZqTEVkQlFVY3NVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eEhRVUZITEVOQlFVTTdVVUZEZGtVc1RVRkJUU3hqUVVGakxFZEJRVWNzVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhIUVVGSExFTkJRVU03VVVGRGRrVXNTVUZCU1N4aFFVRmhMRWRCUVVjc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0UlFVVnVSU3h2UlVGQmIwVTdVVUZEY0VVc2IwSkJRVzlDTzFGQlEzQkNMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zVFVGQlRTeEZRVUZGTEZsQlFWa3NSVUZCUlR0WlFVTXhReXhaUVVGWkxFVkJRVVVzU1VGQlNUdFpRVU5zUWl4SFFVRkhMRVZCUVVVc1EwRkJRenRuUWtGRFNpeFBRVUZQTzI5Q1FVTk1MRWxCUVVrc1dVRkJXU3hEUVVGRE8yOUNRVU5xUWl4TlFVRk5MRmRCUVZjc1IwRkJSeXd5UWtGQk1rSXNRMEZETjBNc1YwRkJWeXhEUVVGRExGbEJRVmtzUTBGRGVrSXNRMEZCUXp0dlFrRkRSaXhOUVVGTkxIZENRVUYzUWl4SFFVRkhMRWRCUVVjc1ZVRkJWU3hKUVVGSkxGbEJRVmtzUlVGQlJTeERRVUZETzI5Q1FVVnFSU3h4UWtGQmNVSTdiMEpCUTNKQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdkMEpCUTJJc2QwSkJRWGRDTzNkQ1FVTjRRaXhaUVVGWkxFZEJRVWNzYTBKQlFXdENMRU5CUVVNN2NVSkJRMjVETzNsQ1FVRk5MRWxCUVVrc1kwRkJZeXhGUVVGRk8zZENRVU42UWl4MVFrRkJkVUk3ZDBKQlEzWkNMRmxCUVZrc1IwRkJSeXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPM0ZDUVVNeFF6dDVRa0ZCVFN4SlFVRkpMRTlCUVU4c1NVRkJTU3hSUVVGUkxFVkJRVVU3ZDBKQlF6bENMRzFDUVVGdFFqdDNRa0ZEYmtJc1dVRkJXU3hIUVVGSExHRkJRV0VzUTBGQlF6dHhRa0ZET1VJN2VVSkJRVTA3ZDBKQlEwd3NUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkRXQ3d5UWtGQk1rSXNkMEpCUVhkQ0xHZERRVUZuUXl4RFFVTndSaXhEUVVGRE8zZENRVU5HTEZGQlFWRXNRMEZEVGl4M1FrRkJkMElzUlVGRGVFSXNSVUZCUlN4RlFVTkdMRmRCUVZjc1EwRkJReXhWUVVGVkxFVkJRM1JDTEZkQlFWY3NSVUZEV0N4WFFVRlhMRU5CUTFvc1EwRkJRenQzUWtGRFJpeFBRVUZQTzNGQ1FVTlNPMjlDUVVWRUxDdEVRVUVyUkR0dlFrRkRMMFFzTWtSQlFUSkVPMjlDUVVNelJDeHpSRUZCYzBRN2IwSkJRM1JFTEd0RlFVRnJSVHR2UWtGRGJFVXNTVUZCU1N4UFFVRlBMRmxCUVZrc1MwRkJTeXhWUVVGVkxFVkJRVVU3ZDBKQlEzUkRMRWxCUVVrc1YwRkJWeXhEUVVGRExHVkJRV1VzUlVGQlJUczBRa0ZETDBJc1VVRkJVU3hEUVVOT0xIZENRVUYzUWl4RlFVTjRRaXhaUVVGWkxFVkJRMW9zVjBGQlZ5eERRVUZETEZsQlFWa3NSVUZEZUVJc1YwRkJWeXhGUVVOWUxGZEJRVmNzUTBGRFdpeERRVUZETzNsQ1FVTklPM2RDUVVORUxFMUJRVTBzTWtKQlFUSkNMRWRCUVVjc2EwSkJRV3RDTEVOQlEzQkVMRlZCUVZVc1JVRkRWaXhaUVVGWkxFVkJRMW9zV1VGQldTeEZRVU5hTEZkQlFWY3NRMEZEV2l4RFFVRkRPM2RDUVVOR0xEUkdRVUUwUmp0M1FrRkROVVlzTUVkQlFUQkhPM2RDUVVNeFJ5eEpRVUZKTEZsQlFWa3NRMEZCUXl4VFFVRlRMRVZCUVVVN05FSkJRekZDTERKQ1FVRXlRaXhEUVVGRExGTkJRVk1zUjBGQlJ5eFpRVUZaTEVOQlFVTXNVMEZCVXl4RFFVRkRPelJDUVVNdlJDeEpRVUZKTEZsQlFWa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhGUVVGRk8yZERRVU4wUXl3eVFrRkJNa0lzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnp0dlEwRkRMME1zV1VGQldTeERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNN05rSkJRM1JETzNsQ1FVTkdPM2RDUVVORUxFOUJRVThzTWtKQlFUSkNMRU5CUVVNN2NVSkJRM0JETzNsQ1FVRk5MRWxCUTB3c1QwRkJUeXhaUVVGWkxFdEJRVXNzVVVGQlVUdDNRa0ZEYUVNc1YwRkJWeXhEUVVGRExGTkJRVk03ZDBKQlEzSkNMRmRCUVZjc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eEZRVU55UWp0M1FrRkRRU3hQUVVGUExGbEJRVmtzUTBGQlF6dHhRa0ZEY2tJN2VVSkJRVTA3ZDBKQlEwd3NVVUZCVVN4RFFVTk9MSGRDUVVGM1FpeEZRVU40UWl4WlFVRlpMRVZCUTFvc1YwRkJWeXhEUVVGRExFZEJRVWNzUlVGRFppeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2QwSkJRMFlzVDBGQlR5eFpRVUZaTEVOQlFVTTdjVUpCUTNKQ08yZENRVU5JTEVOQlFVTXNRMEZCUXp0WlFVTktMRU5CUVVNc1EwRkJReXhGUVVGRk8xbEJRMG9zUjBGQlJ5eEZRVUZGTEVOQlFVTTdaMEpCUTBvc1QwRkJUeXhWUVVGVkxFdEJRVXM3YjBKQlEzQkNMRTFCUVUwc1YwRkJWeXhIUVVGSExESkNRVUV5UWl4RFFVTTNReXhYUVVGWExFTkJRVU1zV1VGQldTeERRVU42UWl4RFFVRkRPMjlDUVVOR0xFMUJRVTBzZDBKQlFYZENMRWRCUVVjc1IwRkJSeXhWUVVGVkxFbEJRVWtzV1VGQldTeEZRVUZGTEVOQlFVTTdiMEpCUTJwRkxFbEJRVWtzVjBGQlZ5eERRVUZETzI5Q1FVVm9RaXh2UkVGQmIwUTdiMEpCUTNCRUxFbEJRMFVzVjBGQlZ5eERRVUZETEZkQlFWYzdkMEpCUTNaQ0xFTkJRVU1zVDBGQlR5eGhRVUZoTEV0QlFVc3NWVUZCVlRzMFFrRkRiRU1zVDBGQlR5eGhRVUZoTEV0QlFVc3NVVUZCVVN4RFFVRkRMRVZCUTNCRE8zZENRVU5CTEZGQlFWRXNRMEZEVGl4M1FrRkJkMElzUlVGRGVFSXNTMEZCU3l4RlFVTk1MRmRCUVZjc1EwRkJReXhoUVVGaExFVkJRM3BDTEZkQlFWY3NSVUZEV0N4WFFVRlhMRU5CUTFvc1EwRkJRenQzUWtGRFJpeFBRVUZQTEV0QlFVc3NRMEZCUXp0eFFrRkRaRHR2UWtGRlJDdzBRMEZCTkVNN2IwSkJRelZETEVsQlFVa3NZMEZCWXl4RlFVRkZPM2RDUVVOc1FpeDFRa0ZCZFVJN2QwSkJRM1pDTEZkQlFWY3NSMEZCUnl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXp0eFFrRkRhRVE3ZVVKQlFVMHNTVUZCU1N4UFFVRlBMRWxCUVVrc1VVRkJVU3hGUVVGRk8zZENRVU01UWl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRE8zZENRVU5pTEVsQlFVa3NUVUZCVFN4RFFVRkRMR0ZCUVdFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUczBRa0ZET1VJc1RVRkJUU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVWQlFVVXNXVUZCV1N4RlFVRkZPMmREUVVONFF5eExRVUZMT3paQ1FVTk9MRU5CUVVNc1EwRkJRenQ1UWtGRFNqczJRa0ZCVFRzMFFrRkRUQ3hoUVVGaExFZEJRVWNzUzBGQlN5eERRVUZETzNsQ1FVTjJRanQzUWtGRFJDeFhRVUZYTEVkQlFVY3NTMEZCU3l4RFFVRkRPM2RDUVVOd1FpeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPM0ZDUVVObU8zbENRVUZOTzNkQ1FVTk1MRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRMWdzTWtKQlFUSkNMSGRDUVVGM1FpeG5RMEZCWjBNc1EwRkRjRVlzUTBGQlF6dDNRa0ZEUml4UlFVRlJMRU5CUTA0c2QwSkJRWGRDTEVWQlEzaENMRXRCUVVzc1JVRkRUQ3hYUVVGWExFTkJRVU1zVlVGQlZTeEZRVU4wUWl4WFFVRlhMRVZCUTFnc1YwRkJWeXhEUVVOYUxFTkJRVU03ZDBKQlEwWXNUMEZCVHl4TFFVRkxMRU5CUVVNN2NVSkJRMlE3YjBKQlEwUXNVVUZCVVN4RFFVTk9MSGRDUVVGM1FpeEZRVU40UWl4TFFVRkxMRVZCUTB3c1YwRkJWeXhEUVVGRExFZEJRVWNzUlVGRFppeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2IwSkJRMFlzVDBGQlR5eFhRVUZYTEVOQlFVTTdaMEpCUTNKQ0xFTkJRVU1zUTBGQlF6dFpRVU5LTEVOQlFVTXNRMEZCUXl4RlFVRkZPMU5CUTB3c1EwRkJReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZFTEZOQlFWTXNaMEpCUVdkQ0xFTkJRM1pDTEUxQlFWY3NSVUZEV0N4blFrRkJkMElzUlVGRGVFSXNWMEZCZDBJN1VVRkZlRUlzWjBaQlFXZEdPMUZCUTJoR0xIZERRVUYzUXp0UlFVTjRReXhKUVVGSkxITkNRVUZuUXl4RFFVRkRPMUZCUTNKRExFbEJRVWtzVjBGQlZ5eERRVUZETEhOQ1FVRnpRaXhMUVVGTExFbEJRVWtzUlVGQlJUdFpRVU12UXl4elFrRkJjMElzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVMEZETjBJN1lVRkJUU3hKUVVGSkxGZEJRVmNzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhOUVVGTkxFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlF6RkVMSE5DUVVGelFpeEhRVUZITEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTXhSRHRoUVVGTk8xbEJRMHdzYzBKQlFYTkNMRWRCUVVjc1YwRkJWeXhEUVVGRExITkNRVUZ6UWl4RFFVRkRPMU5CUXpkRU8xRkJRMFFzUzBGQlN5eE5RVUZOTEZsQlFWa3NTVUZCU1N4elFrRkJjMElzUlVGQlJUdFpRVU5xUkN4SlFVRkpMRmRCUVZjc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UlFVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFVkJRVVU3WjBKQlEzcEVMRk5CUVZNN1lVRkRWanRaUVVORUxHZEZRVUZuUlR0WlFVTm9SU3h6UkVGQmMwUTdXVUZEZEVRc1NVRkRSU3hYUVVGWExFTkJRVU1zVTBGQlV6dG5Ra0ZEY2tJc1YwRkJWeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETzJkQ1FVTnlRaXhSUVVGUkxFTkJRVU1zVFVGQlRTeEZRVUZGTEZsQlFWa3NRMEZCUXp0blFrRkRPVUlzV1VGQldTeExRVUZMTEZkQlFWY3NSVUZETlVJN1owSkJRMEVzVFVGQlRTeHRRa0ZCYlVJc1IwRkJSeXhIUVVGSExHZENRVUZuUWl4SlFVRkpMRmxCUVZrc1JVRkJSU3hEUVVGRE8yZENRVU5zUlN4TlFVRk5MR05CUVdNc1IwRkJSeXhGUVVGRkxFZEJRVWNzVjBGQlZ5eEZRVUZGTEVOQlFVTTdaMEpCUXpGRExHTkJRV01zUTBGQlF5eExRVUZMTEVkQlFVY3NWMEZCVnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6ZERMR05CUVdNc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4RlFVRkZMRU5CUVVNN1owSkJRek5ETEdkQ1FVRm5RaXhEUVVOa0xFMUJRVTBzUTBGQlF5eFpRVUZaTEVOQlFVTXNSVUZEY0VJc2JVSkJRVzFDTEVWQlEyNUNMR05CUVdNc1EwRkRaaXhEUVVGRE8yRkJRMGc3V1VGRFJDeEpRVUZKTzJkQ1FVTkdMSGRDUVVGM1FpeERRVU4wUWl4TlFVRk5MRVZCUTA0c1owSkJRV2RDTEVWQlEyaENMRmxCUVZrc1JVRkRXaXhYUVVGWExFTkJRMW9zUTBGQlF6dGhRVU5JTzFsQlFVTXNUMEZCVHl4TFFVRkxMRVZCUVVVN1owSkJRMlFzU1VGRFJTeExRVUZMTEZsQlFWa3NVMEZCVXp0dlFrRkRNVUlzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc01FTkJRVEJETEVOQlFVTXNSVUZEYkVVN2IwSkJRMEVzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZEVml4blJFRkJaMFFzWjBKQlFXZENMRWxCUVVrc1dVRkJXU3hGUVVGRkxFTkJRMjVHTEVOQlFVTTdhVUpCUTBnN2NVSkJRVTA3YjBKQlEwd3NhVUpCUVdsQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzV1VGQldTeEZRVUZGTEVOQlFVTXNRMEZCUXp0cFFrRkRPVVE3WVVGRFJqdFRRVU5HTzFGQlEwUXNTMEZCU3l4TlFVRk5MRmxCUVZrc1NVRkJTU3hYUVVGWExFTkJRVU1zYVVOQlFXbERMRVZCUVVVN1dVRkRlRVVzU1VGQlNTeFhRVUZYTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zVVVGQlVTeERRVUZETEZsQlFWa3NRMEZCUXl4RlFVRkZPMmRDUVVONlJDeFRRVUZUTzJGQlExWTdXVUZEUkN4SlFVRkpPMmRDUVVOR0xIZENRVUYzUWl4RFFVTjBRaXhOUVVGTkxFVkJRMDRzWjBKQlFXZENMRVZCUTJoQ0xGbEJRVmtzUlVGRFdpeFhRVUZYTEVOQlExb3NRMEZCUXp0aFFVTklPMWxCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3WjBKQlEyUXNhVUpCUVdsQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzV1VGQldTeEZRVUZGTEVOQlFVTXNRMEZCUXp0aFFVTTVSRHRUUVVOR08wbEJRMGdzUTBGQlF6dEpRVVZFTEUxQlFVMHNWMEZCVnl4SFFVRkhMRlZCUVZVc1QwRkJUeXhGUVVGRkxIRkNRVUZ4UWp0UlFVTXhSQ3hKUVVGSkxGRkJRVkVzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEYkVJc2JVTkJRVzFETzFGQlEyNURMRTFCUVUwc1MwRkJTeXhIUVVGSExGRkJRVkVzUTBGQlF6dFpRVU55UWl4eFFrRkJjVUlzUTBGQlF5eFBRVUZQTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkZla01zYTBKQlFXdENPMWxCUTJ4Q0xGRkJRVkVzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEYUVJc1EwRkJReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJWSXNUMEZCVHl4VlFVRlZMRTlCUVU4c1JVRkJSU3hIUVVGSE8xbEJRek5DTEc5Q1FVRnZRanRaUVVOd1FpeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVNdlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0UlFVTldMRU5CUVVNc1EwRkJRenRKUVVOS0xFTkJRVU1zUTBGQlF6dEpRVVZHTEUxQlFVMHNTVUZCU1N4SFFVRkhMRmRCUVZjc1EwRkJReXhQUVVGUExFVkJRVVVzYjBKQlFXOUNMRU5CUVVNc1EwRkJRenRKUVVWNFJDeFRRVUZUTEZsQlFWa3NRMEZCUXl4dlFrRkJNa003VVVGREwwUXNhVVZCUVdsRk8xRkJRMnBGTERoRFFVRTRRenRSUVVVNVF5eDVSRUZCZVVRN1VVRkRla1FzYVVSQlFXbEVPMUZCUTJwRUxHOUNRVUZ2UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGVkxFbEJRVWs3V1VGRGVrTXNaMEpCUVdkQ0xFTkJRMlFzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkRha0lzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhGUVVOeVFpeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVTnFRaXhEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUlVRc1owWkJRV2RHTzBsQlEyaEdMRTlCUVU4c1dVRkJXU3hEUVVGRE8wRkJRM1JDTEVOQlFVTWlmUT09IiwiLyoqXG4gKiBUaWVzIHRvZ2V0aGVyIHRoZSB0d28gc2VwYXJhdGUgbmF2aWdhdGlvbiBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHBhcmVudCBmcmFtZSBpZCBhbmQgdHJhbnNpdGlvbi1yZWxhdGVkIGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdOYXZpZ2F0aW9uIHtcbiAgICBvbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uO1xuICAgIG9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uO1xuICAgIHJlc29sdmVPbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uO1xuICAgIHJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24gPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbiA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbiA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbixcbiAgICAgICAgICAgIHRoaXMub25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxdVlYWnBaMkYwYVc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl3Wlc1a2FXNW5MVzVoZG1sbllYUnBiMjR1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlJVRTdPMGRCUlVjN1FVRkRTQ3hOUVVGTkxFOUJRVThzYVVKQlFXbENPMGxCUTFvc0swSkJRU3RDTEVOQlFYTkNPMGxCUTNKRUxEQkNRVUV3UWl4RFFVRnpRanRKUVVONlJDeHpRMEZCYzBNc1EwRkJaME03U1VGRGRFVXNhVU5CUVdsRExFTkJRV2RETzBsQlEzaEZPMUZCUTBVc1NVRkJTU3hEUVVGRExDdENRVUVyUWl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVTdXVUZETjBRc1NVRkJTU3hEUVVGRExITkRRVUZ6UXl4SFFVRkhMRTlCUVU4c1EwRkJRenRSUVVONFJDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTzFsQlEzaEVMRWxCUVVrc1EwRkJReXhwUTBGQmFVTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRia1FzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUTAwc1VVRkJVVHRSUVVOaUxFOUJRVThzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0WlFVTnFRaXhKUVVGSkxFTkJRVU1zSzBKQlFTdENPMWxCUTNCRExFbEJRVWtzUTBGQlF5d3dRa0ZCTUVJN1UwRkRhRU1zUTBGQlF5eERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVkVPenM3T3p0UFFVdEhPMGxCUTBrc1MwRkJTeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRVZCUVVVN1VVRkRia01zVFVGQlRTeFJRVUZSTEVkQlFVY3NUVUZCVFN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRMnhETEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVN1dVRkRaaXhKUVVGSkxFOUJRVThzUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RlFVRkZMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0VFFVTnNSQ3hEUVVGRExFTkJRVU03VVVGRFNDeFBRVUZQTEZGQlFWRXNRMEZCUXp0SlFVTnNRaXhEUVVGRE8wTkJRMFlpZlE9PSIsIi8qKlxuICogVGllcyB0b2dldGhlciB0aGUgdHdvIHNlcGFyYXRlIGV2ZW50cyB0aGF0IHRvZ2V0aGVyIGhvbGRzIGluZm9ybWF0aW9uIGFib3V0IGJvdGggcmVxdWVzdCBoZWFkZXJzIGFuZCBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nUmVxdWVzdCB7XG4gICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzO1xuICAgIG9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHM7XG4gICAgcmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICByZXNvbHZlT25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc29sdmVkKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxeVpYRjFaWE4wTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXdaVzVrYVc1bkxYSmxjWFZsYzNRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJTMEU3TzBkQlJVYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1kwRkJZenRKUVVOVUxESkNRVUV5UWl4RFFVRnBSRHRKUVVNMVJTd3JRa0ZCSzBJc1EwRkJjVVE3U1VGRE4wWXNhME5CUVd0RExFTkJSUzlDTzBsQlEwZ3NjME5CUVhORExFTkJSVzVETzBsQlExWTdVVUZEUlN4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVkQlFVY3NTVUZCU1N4UFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJUdFpRVU42UkN4SlFVRkpMRU5CUVVNc2EwTkJRV3RETEVkQlFVY3NUMEZCVHl4RFFVRkRPMUZCUTNCRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NTVUZCU1N4RFFVRkRMQ3RDUVVFclFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVU3V1VGRE4wUXNTVUZCU1N4RFFVRkRMSE5EUVVGelF5eEhRVUZITEU5QlFVOHNRMEZCUXp0UlFVTjRSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZEVFN4UlFVRlJPMUZCUTJJc1QwRkJUeXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETzFsQlEycENMRWxCUVVrc1EwRkJReXd5UWtGQk1rSTdXVUZEYUVNc1NVRkJTU3hEUVVGRExDdENRVUVyUWp0VFFVTnlReXhEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlJVUTdPenM3TzA5QlMwYzdTVUZEU1N4TFFVRkxMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNSVUZCUlR0UlFVTnVReXhOUVVGTkxGRkJRVkVzUjBGQlJ5eE5RVUZOTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRiRU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0WlFVTm1MRWxCUVVrc1QwRkJUeXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFOQlEyeEVMRU5CUVVNc1EwRkJRenRSUVVOSUxFOUJRVThzVVVGQlVTeERRVUZETzBsQlEyeENMRU5CUVVNN1EwRkRSaUo5IiwiaW1wb3J0IHsgUmVzcG9uc2VCb2R5TGlzdGVuZXIgfSBmcm9tIFwiLi9yZXNwb25zZS1ib2R5LWxpc3RlbmVyXCI7XG4vKipcbiAqIFRpZXMgdG9nZXRoZXIgdGhlIHR3byBzZXBhcmF0ZSBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHJlc3BvbnNlIGhlYWRlcnMgYW5kIGJvZHlcbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdSZXNwb25zZSB7XG4gICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzO1xuICAgIG9uQ29tcGxldGVkRXZlbnREZXRhaWxzO1xuICAgIHJlc3BvbnNlQm9keUxpc3RlbmVyO1xuICAgIHJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHM7XG4gICAgcmVzb2x2ZU9uQ29tcGxldGVkRXZlbnREZXRhaWxzO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlZEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkNvbXBsZXRlZEV2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRSZXNwb25zZVJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZUJvZHlMaXN0ZW5lciA9IG5ldyBSZXNwb25zZUJvZHlMaXN0ZW5lcihkZXRhaWxzKTtcbiAgICB9XG4gICAgcmVzb2x2ZWQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZWRFdmVudERldGFpbHMsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxeVpYTndiMjV6WlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZjR1Z1WkdsdVp5MXlaWE53YjI1elpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZKUVN4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTEVWQlFVVXNUVUZCVFN3d1FrRkJNRUlzUTBGQlF6dEJRVVZvUlRzN1IwRkZSenRCUVVOSUxFMUJRVTBzVDBGQlR5eGxRVUZsTzBsQlExWXNNa0pCUVRKQ0xFTkJRV2xFTzBsQlF6VkZMSFZDUVVGMVFpeERRVUUyUXp0SlFVTTNSU3h2UWtGQmIwSXNRMEZCZFVJN1NVRkRNME1zYTBOQlFXdERMRU5CUlM5Q08wbEJRMGdzT0VKQlFUaENMRU5CUlROQ08wbEJRMVk3VVVGRFJTeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSVHRaUVVONlJDeEpRVUZKTEVOQlFVTXNhME5CUVd0RExFZEJRVWNzVDBGQlR5eERRVUZETzFGQlEzQkVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzU1VGQlNTeERRVUZETEhWQ1FVRjFRaXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVN1dVRkRja1FzU1VGQlNTeERRVUZETERoQ1FVRTRRaXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU5vUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRFRTd3JRa0ZCSzBJc1EwRkRjRU1zVDBGQk9FTTdVVUZGT1VNc1NVRkJTU3hEUVVGRExHOUNRVUZ2UWl4SFFVRkhMRWxCUVVrc2IwSkJRVzlDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVU5OTEZGQlFWRTdVVUZEWWl4UFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU03V1VGRGFrSXNTVUZCU1N4RFFVRkRMREpDUVVFeVFqdFpRVU5vUXl4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTzFOQlF6ZENMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5KTEV0QlFVc3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eEZRVUZGTzFGQlEyNURMRTFCUVUwc1VVRkJVU3hIUVVGSExFMUJRVTBzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTnNReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTzFsQlEyWXNTVUZCU1N4UFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeERRVUZETEZWQlFWVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03VTBGRGJFUXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhSUVVGUkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0RFFVTkdJbjA9IiwiaW1wb3J0IHsgZGlnZXN0TWVzc2FnZSB9IGZyb20gXCIuL3NoYTI1NlwiO1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlQm9keUxpc3RlbmVyIHtcbiAgICByZXNwb25zZUJvZHk7XG4gICAgY29udGVudEhhc2g7XG4gICAgcmVzb2x2ZVJlc3BvbnNlQm9keTtcbiAgICByZXNvbHZlQ29udGVudEhhc2g7XG4gICAgY29uc3RydWN0b3IoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlc3BvbnNlQm9keSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVSZXNwb25zZUJvZHkgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250ZW50SGFzaCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVDb250ZW50SGFzaCA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBVc2VkIHRvIHBhcnNlIFJlc3BvbnNlIHN0cmVhbVxuICAgICAgICBjb25zdCBmaWx0ZXIgPSBicm93c2VyLndlYlJlcXVlc3QuZmlsdGVyUmVzcG9uc2VEYXRhKGRldGFpbHMucmVxdWVzdElkLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgcmVzcG9uc2VCb2R5ID0gbmV3IFVpbnQ4QXJyYXkoKTtcbiAgICAgICAgZmlsdGVyLm9uZGF0YSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgZGlnZXN0TWVzc2FnZShldmVudC5kYXRhKS50aGVuKChkaWdlc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVDb250ZW50SGFzaChkaWdlc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpbmNvbWluZyA9IG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdG1wID0gbmV3IFVpbnQ4QXJyYXkocmVzcG9uc2VCb2R5Lmxlbmd0aCArIGluY29taW5nLmxlbmd0aCk7XG4gICAgICAgICAgICB0bXAuc2V0KHJlc3BvbnNlQm9keSk7XG4gICAgICAgICAgICB0bXAuc2V0KGluY29taW5nLCByZXNwb25zZUJvZHkubGVuZ3RoKTtcbiAgICAgICAgICAgIHJlc3BvbnNlQm9keSA9IHRtcDtcbiAgICAgICAgICAgIGZpbHRlci53cml0ZShldmVudC5kYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsdGVyLm9uc3RvcCA9IChfZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVJlc3BvbnNlQm9keShyZXNwb25zZUJvZHkpO1xuICAgICAgICAgICAgZmlsdGVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZUJvZHk7XG4gICAgfVxuICAgIGFzeW5jIGdldENvbnRlbnRIYXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50SGFzaDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljbVZ6Y0c5dWMyVXRZbTlrZVMxc2FYTjBaVzVsY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZjbVZ6Y0c5dWMyVXRZbTlrZVMxc2FYTjBaVzVsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkRRU3hQUVVGUExFVkJRVVVzWVVGQllTeEZRVUZGTEUxQlFVMHNWVUZCVlN4RFFVRkRPMEZCUlhwRExFMUJRVTBzVDBGQlR5eHZRa0ZCYjBJN1NVRkRaQ3haUVVGWkxFTkJRWE5DTzBsQlEyeERMRmRCUVZjc1EwRkJhMEk3U1VGRGRFTXNiVUpCUVcxQ0xFTkJRWEZETzBsQlEzaEVMR3RDUVVGclFpeERRVUZuUXp0SlFVVXhSQ3haUVVGWkxFOUJRVGhETzFGQlEzaEVMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSVHRaUVVNeFF5eEpRVUZKTEVOQlFVTXNiVUpCUVcxQ0xFZEJRVWNzVDBGQlR5eERRVUZETzFGQlEzSkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzU1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTzFsQlEzcERMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRjRU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGU0N4blEwRkJaME03VVVGRGFFTXNUVUZCVFN4TlFVRk5MRWRCUVZFc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eHJRa0ZCYTBJc1EwRkRka1FzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkRkRUlzUTBGQlF6dFJRVVZVTEVsQlFVa3NXVUZCV1N4SFFVRkhMRWxCUVVrc1ZVRkJWU3hGUVVGRkxFTkJRVU03VVVGRGNFTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFdEJRVXNzUlVGQlJTeEZRVUZGTzFsQlEzaENMR0ZCUVdFc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVVU3WjBKQlEzaERMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRaUVVOc1F5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRTFCUVUwc1VVRkJVU3hIUVVGSExFbEJRVWtzVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNMVF5eE5RVUZOTEVkQlFVY3NSMEZCUnl4SlFVRkpMRlZCUVZVc1EwRkJReXhaUVVGWkxFTkJRVU1zVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRaUVVOc1JTeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xbEJRM1JDTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hGUVVGRkxGbEJRVmtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0WlFVTjJReXhaUVVGWkxFZEJRVWNzUjBGQlJ5eERRVUZETzFsQlEyNUNMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF6dFJRVVZHTEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJUdFpRVU42UWl4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1dVRkRka01zVFVGQlRTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMUZCUTNSQ0xFTkJRVU1zUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVFN4TFFVRkxMRU5CUVVNc1pVRkJaVHRSUVVNeFFpeFBRVUZQTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNN1NVRkRNMElzUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4alFVRmpPMUZCUTNwQ0xFOUJRVThzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0SlFVTXhRaXhEUVVGRE8wTkJRMFlpZlE9PSIsIi8qKlxuICogQ29kZSBmcm9tIHRoZSBleGFtcGxlIGF0XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU3VidGxlQ3J5cHRvL2RpZ2VzdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlnZXN0TWVzc2FnZShtc2dVaW50OCkge1xuICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnVWludDgpOyAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gICAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7IC8vIGNvbnZlcnQgYnVmZmVyIHRvIGJ5dGUgYXJyYXlcbiAgICBjb25zdCBoYXNoSGV4ID0gaGFzaEFycmF5XG4gICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7IC8vIGNvbnZlcnQgYnl0ZXMgdG8gaGV4IHN0cmluZ1xuICAgIHJldHVybiBoYXNoSGV4O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJoaE1qVTJMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5emFHRXlOVFl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenRIUVVkSE8wRkJSVWdzVFVGQlRTeERRVUZETEV0QlFVc3NWVUZCVlN4aFFVRmhMRU5CUVVNc1VVRkJiMEk3U1VGRGRFUXNUVUZCVFN4VlFVRlZMRWRCUVVjc1RVRkJUU3hOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJN1NVRkRka1lzVFVGQlRTeFRRVUZUTEVkQlFVY3NTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxGVkJRVlVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc0swSkJRU3RDTzBsQlEzcEdMRTFCUVUwc1QwRkJUeXhIUVVGSExGTkJRVk03VTBGRGRFSXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRNME1zU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc09FSkJRVGhDTzBsQlF6TkRMRTlCUVU4c1QwRkJUeXhEUVVGRE8wRkJRMnBDTEVOQlFVTWlmUT09IiwiZXhwb3J0IGZ1bmN0aW9uIGVuY29kZV91dGY4KHMpIHtcbiAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcbn1cbmV4cG9ydCBjb25zdCBlc2NhcGVTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgLy8gQ29udmVydCB0byBzdHJpbmcgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVfdXRmOChzdHIpO1xufTtcbmV4cG9ydCBjb25zdCBlc2NhcGVVcmwgPSBmdW5jdGlvbiAodXJsLCBzdHJpcERhdGFVcmxEYXRhID0gdHJ1ZSkge1xuICAgIHVybCA9IGVzY2FwZVN0cmluZyh1cmwpO1xuICAgIC8vIGRhdGE6WzxtZWRpYXR5cGU+XVs7YmFzZTY0XSw8ZGF0YT5cbiAgICBpZiAodXJsLnN1YnN0cigwLCA1KSA9PT0gXCJkYXRhOlwiICYmXG4gICAgICAgIHN0cmlwRGF0YVVybERhdGEgJiZcbiAgICAgICAgdXJsLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigwLCB1cmwuaW5kZXhPZihcIixcIikgKyAxKSArIFwiPGRhdGEtc3RyaXBwZWQ+XCI7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59O1xuLy8gQmFzZTY0IGVuY29kaW5nLCBmb3VuZCBvbjpcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNzEwMDAxL2hvdy10by1jb252ZXJ0LXVpbnQ4LWFycmF5LXRvLWJhc2U2NC1lbmNvZGVkLXN0cmluZy8yNTY0NDQwOSMyNTY0NDQwOVxuZXhwb3J0IGNvbnN0IFVpbnQ4VG9CYXNlNjQgPSBmdW5jdGlvbiAodThBcnIpIHtcbiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwOyAvLyBhcmJpdHJhcnkgbnVtYmVyXG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1OEFyci5sZW5ndGg7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgbGV0IHNsaWNlO1xuICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBzbGljZSA9IHU4QXJyLnN1YmFycmF5KGluZGV4LCBNYXRoLm1pbihpbmRleCArIENIVU5LX1NJWkUsIGxlbmd0aCkpO1xuICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBzbGljZSk7XG4gICAgICAgIGluZGV4ICs9IENIVU5LX1NJWkU7XG4gICAgfVxuICAgIHJldHVybiBidG9hKHJlc3VsdCk7XG59O1xuZXhwb3J0IGNvbnN0IGJvb2xUb0ludCA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgcmV0dXJuIGJvb2wgPyAxIDogMDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljM1J5YVc1bkxYVjBhV3h6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXpkSEpwYm1jdGRYUnBiSE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRXNUVUZCVFN4VlFVRlZMRmRCUVZjc1EwRkJReXhEUVVGRE8wbEJRek5DTEU5QlFVOHNVVUZCVVN4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRla01zUTBGQlF6dEJRVVZFTEUxQlFVMHNRMEZCUXl4TlFVRk5MRmxCUVZrc1IwRkJSeXhWUVVGVkxFZEJRVkU3U1VGRE5VTXNhVU5CUVdsRE8wbEJRMnBETEVsQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVVzc1VVRkJVU3hGUVVGRk8xRkJRek5DTEVkQlFVY3NSMEZCUnl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03UzBGRGJrSTdTVUZGUkN4UFFVRlBMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEJRVU14UWl4RFFVRkRMRU5CUVVNN1FVRkZSaXhOUVVGTkxFTkJRVU1zVFVGQlRTeFRRVUZUTEVkQlFVY3NWVUZEZGtJc1IwRkJWeXhGUVVOWUxHMUNRVUUwUWl4SlFVRkpPMGxCUldoRExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRlRUlzY1VOQlFYRkRPMGxCUTNKRExFbEJRMFVzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzVDBGQlR6dFJRVU0xUWl4blFrRkJaMEk3VVVGRGFFSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZEY2tJN1VVRkRRU3hIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRVZCUVVVc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhwUWtGQmFVSXNRMEZCUXp0TFFVTXZSRHRKUVVORUxFOUJRVThzUjBGQlJ5eERRVUZETzBGQlEySXNRMEZCUXl4RFFVRkRPMEZCUlVZc05rSkJRVFpDTzBGQlF6ZENMSEZJUVVGeFNEdEJRVU55U0N4TlFVRk5MRU5CUVVNc1RVRkJUU3hoUVVGaExFZEJRVWNzVlVGQlZTeExRVUZwUWp0SlFVTjBSQ3hOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNRMEZCUXl4dFFrRkJiVUk3U1VGRE9VTXNTVUZCU1N4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMlFzVFVGQlRTeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJRenRKUVVNMVFpeEpRVUZKTEUxQlFVMHNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRkRhRUlzU1VGQlNTeExRVUZwUWl4RFFVRkRPMGxCUTNSQ0xFOUJRVThzUzBGQlN5eEhRVUZITEUxQlFVMHNSVUZCUlR0UlFVTnlRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVkQlFVY3NWVUZCVlN4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGNFVXNUVUZCVFN4SlFVRkpMRTFCUVUwc1EwRkJReXhaUVVGWkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRSUVVOcVJDeExRVUZMTEVsQlFVa3NWVUZCVlN4RFFVRkRPMHRCUTNKQ08wbEJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkRkRUlzUTBGQlF5eERRVUZETzBGQlJVWXNUVUZCVFN4RFFVRkRMRTFCUVUwc1UwRkJVeXhIUVVGSExGVkJRVlVzU1VGQllUdEpRVU01UXl4UFFVRlBMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRkRUlzUTBGQlF5eERRVUZESW4wPSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cbi8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyNnaXN0Y29tbWVudC0yNDAzMzY5XG5jb25zdCBoZXggPSBbXTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBoZXhbaV0gPSAoaSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIGkudG9TdHJpbmcoMTYpO1xufVxuZXhwb3J0IGNvbnN0IG1ha2VVVUlEID0gKCkgPT4ge1xuICAgIGNvbnN0IHIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDE2KSk7XG4gICAgcls2XSA9IChyWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJbOF0gPSAocls4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICByZXR1cm4gKGhleFtyWzBdXSArXG4gICAgICAgIGhleFtyWzFdXSArXG4gICAgICAgIGhleFtyWzJdXSArXG4gICAgICAgIGhleFtyWzNdXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbNF1dICtcbiAgICAgICAgaGV4W3JbNV1dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbcls2XV0gK1xuICAgICAgICBoZXhbcls3XV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzhdXSArXG4gICAgICAgIGhleFtyWzldXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbMTBdXSArXG4gICAgICAgIGhleFtyWzExXV0gK1xuICAgICAgICBoZXhbclsxMl1dICtcbiAgICAgICAgaGV4W3JbMTNdXSArXG4gICAgICAgIGhleFtyWzE0XV0gK1xuICAgICAgICBoZXhbclsxNV1dKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWFZwWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZkWFZwWkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3dyUWtGQkswSTdRVUZGTDBJc09FUkJRVGhFTzBGQlF6bEVMRTFCUVUwc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF6dEJRVVZtTEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1NVRkROVUlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8wTkJReTlETzBGQlJVUXNUVUZCVFN4RFFVRkRMRTFCUVUwc1VVRkJVU3hIUVVGSExFZEJRVWNzUlVGQlJUdEpRVU16UWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEVsQlFVa3NWVUZCVlN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRmNrUXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU0xUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzBsQlJUVkNMRTlCUVU4c1EwRkRUQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTlVMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEVml4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlExWXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5XTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRFZpeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMVlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVOWUxFTkJRVU03UVVGRFNpeERRVUZETEVOQlFVTWlmUT09IiwiLy8gaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuZXhwb3J0IGNvbnN0IGRhdGVUaW1lVW5pY29kZUZvcm1hdFN0cmluZyA9IFwieXl5eS1NTS1kZCdUJ0hIOm1tOnNzLlNTU1hYXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMk5vWlcxaExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNOamFHVnRZUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGSlFTd3JSVUZCSzBVN1FVRkRMMFVzVFVGQlRTeERRVUZETEUxQlFVMHNNa0pCUVRKQ0xFZEJRVWNzTmtKQlFUWkNMRU5CUVVNaWZRPT0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7aW5qZWN0SmF2YXNjcmlwdEluc3RydW1lbnRQYWdlU2NyaXB0fSBmcm9tIFwib3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uXCI7XG5cbmluamVjdEphdmFzY3JpcHRJbnN0cnVtZW50UGFnZVNjcmlwdCh3aW5kb3cub3BlbldwbUNvbnRlbnRTY3JpcHRDb25maWcgfHwge30pO1xuZGVsZXRlIHdpbmRvdy5vcGVuV3BtQ29udGVudFNjcmlwdENvbmZpZztcbiJdLCJzb3VyY2VSb290IjoiIn0=