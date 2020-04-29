import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";

export const HTTP_METHODS: THTTPMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
];
export const HTTP_MIME_TYPES: THTTPBodyMIME[] = [
  "application/json",
  "application/x-www-form-urlencoded",
  "application/xml",
  "binary",
  "multipart/form-data",
  "text/html",
  "text/plain",
];

type StatusCode = {
  value: number;
  hint: string;
  hr: string;
};
export const HTTP_STATUS_CODES: StatusCode[] = [
  // 1xx
  {
    value: 100,
    hr: "Continue",
    hint:
      "The server has received the request headers and the client should proceed to send the request body (in the case of a request for which a body needs to be sent; for example, a POST request). Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient. To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request and receive a 100 Continue status code in response before sending the body. If the client receives an error code such as 403 (Forbidden) or 405 (Method Not Allowed) then it shouldn't send the request's body. The response 417 Expectation Failed indicates that the request should be repeated without the Expect header as it indicates that the server doesn't support expectations (this is the case, for example, of HTTP/1.0 servers).",
  },
  {
    value: 101,
    hr: "Switching Protocols",
    hint:
      "The requester has asked the server to switch protocols and the server has agreed to do so.",
  },
  {
    value: 102,
    hr: "Processing",
    hint:
      "A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.[6] This prevents the client from timing out and assuming the request was lost.",
  },
  {
    value: 103,
    hr: "Early Hints",
    hint: "Used to return some response headers before final HTTP message.",
  },

  // 2xx
  {
    value: 200,
    hr: "OK",
    hint:
      "Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.",
  },
  {
    value: 201,
    hr: "Created",
    hint:
      "The request has been fulfilled, resulting in the creation of a new resource.",
  },
  {
    value: 202,
    hr: "Accepted",
    hint:
      "The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.",
  },
  {
    value: 203,
    hr: "Non-Authoritative Information",
    hint:
      "The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.",
  },
  {
    value: 204,
    hr: "No Content",
    hint:
      "The server successfully processed the request and is not returning any content.",
  },
  {
    value: 205,
    hr: "Reset Content",
    hint:
      "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.",
  },
  {
    value: 206,
    hr: "Partial Content",
    hint:
      "The server is delivering only part of the resource (byte serving) due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.",
  },
  {
    value: 207,
    hr: "Multi-Status",
    hint:
      "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
  },
  {
    value: 208,
    hr: "Already Reported",
    hint:
      "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.",
  },
  {
    value: 226,
    hr: "IM Used",
    hint:
      "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  },

  // 3xx
  {
    value: 300,
    hr: "Multiple Choices",
    hint:
      "Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation). For example, this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest word-sense disambiguation.",
  },
  {
    value: 301,
    hr: "Moved Permanently",
    hint: "This and all future requests should be directed to the given URI.",
  },
  {
    value: 302,
    hr: "Found",
    hint:
      "Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307. This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was 'Moved Temporarily'), but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours. However, some Web applications and frameworks use the 302 status code as if it were the 303.",
  },
  {
    value: 303,
    hr: "See Other",
    hint:
      "The response to the request can be found under another URI using the GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a new GET request to the given URI.",
  },
  {
    value: 304,
    hr: "Not Modified",
    hint:
      "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.",
  },
  {
    value: 305,
    hr: "Use Proxy",
    hint:
      "The requested resource is available only through a proxy, the address for which is provided in the response. For security reasons, many HTTP clients (such as Mozilla Firefox and Internet Explorer) do not obey this status code.",
  },
  {
    value: 306,
    hr: "Switch Proxy",
    hint:
      'No longer used. Originally meant "Subsequent requests should use the specified proxy."',
  },
  {
    value: 307,
    hr: "Temporary Redirect",
    hint:
      "In this case, the request should be repeated with another URI; however, future requests should still use the original URI. In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. For example, a POST request should be repeated using another POST request.",
  },
  {
    value: 308,
    hr: "Permanent Redirect",
    hint:
      "The request and all future requests should be repeated using another URI. 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly.",
  },

  // 4xx
  {
    value: 400,
    hr: "Bad Request",
    hint:
      "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).",
  },
  {
    value: 401,
    hr: "Unauthorized",
    hint:
      "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication. 401 semantically means 'unauthorised', the user does not have valid authentication credentials for the target resource. Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.",
  },
  {
    value: 402,
    hr: "Payment Required",
    hint:
      "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed, for example, by GNU Taler, but that has not yet happened, and this code is not widely used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests. Sipgate uses this code if an account does not have sufficient funds to start a call. Shopify uses this code when the store has not paid their fees and is temporarily disabled. Stripe uses this code for failed payments where parameters were correct, for example blocked fraudulent payments.",
  },
  {
    value: 403,
    hr: "Forbidden",
    hint:
      "The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication via the WWW-Authenticate header field, but the server did not accept that authentication. The request should not be repeated.",
  },
  {
    value: 404,
    hr: "Not Found",
    hint:
      "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.",
  },
  {
    value: 405,
    hr: "Method Not Allowed",
    hint:
      "A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.",
  },
  {
    value: 406,
    hr: "Not Acceptable",
    hint:
      "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.",
  },
  {
    value: 407,
    hr: "Proxy Authentication Required",
    hint: "The client must first authenticate itself with the proxy.",
  },
  {
    value: 408,
    hr: "Request Timeout",
    hint:
      'The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."',
  },
  {
    value: 409,
    hr: "Conflict",
    hint:
      "Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
  },
  {
    value: 410,
    hr: "Gone",
    hint:
      "ndicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future. Clients such as search engines should remove the resource from their indices. Most use cases do not require clients and search engines to purge the resource, and a '404 Not Found' may be used instead.",
  },
  {
    value: 411,
    hr: "Length Required",
    hint:
      "The request did not specify the length of its content, which is required by the requested resource.",
  },
  {
    value: 412,
    hr: "Precondition Failed",
    hint:
      "The server does not meet one of the preconditions that the requester put on the request header fields.",
  },
  {
    value: 413,
    hr: " Payload Too Large",
    hint:
      'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".',
  },
  {
    value: 414,
    hr: " URI Too Long",
    hint:
      'The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request. Called "Request-URI Too Long" previously.',
  },
  {
    value: 415,
    hr: "Unsupported Media Type",
    hint:
      "he request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.",
  },
  {
    value: 416,
    hr: "Range Not Satisfiable",
    hint:
      'The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file. Called "Requested Range Not Satisfiable" previously.',
  },
  {
    value: 417,
    hr: "Expectation Failed",
    hint:
      "The server cannot meet the requirements of the Expect request-header field.",
  },
  {
    value: 418,
    hr: "I'm a teapot",
    hint:
      "This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.",
  },
  {
    value: 421,
    hr: "Misdirected Request",
    hint:
      "The request was directed at a server that is not able to produce a response (for example because of connection reuse).",
  },
  {
    value: 422,
    hr: "Unprocessable Entity",
    hint:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  {
    value: 423,
    hr: "Locked",
    hint: "The resource that is being accessed is locked.",
  },
  {
    value: 424,
    hr: "Failed Dependency",
    hint:
      "The request failed because it depended on another request and that request failed (e.g., a PROPPATCH).",
  },
  {
    value: 425,
    hr: " Too Early",
    hint:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  },
  {
    value: 426,
    hr: "Upgrade Required",
    hint:
      "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
  },
  {
    value: 428,
    hr: " Precondition Required",
    hint:
      "The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.",
  },
  {
    value: 429,
    hr: "Too Many Requests",
    hint:
      "The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.",
  },
  {
    value: 431,
    hr: "Request Header Fields Too Large",
    hint:
      "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
  },
  {
    value: 451,
    hr: "Unavailable For Legal Reasons",
    hint:
      "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451 (see the Acknowledgements in the RFC).",
  },

  // 5xx
  {
    value: 500,
    hr: "Internal Server Error",
    hint:
      "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
  },
  {
    value: 501,
    hr: "Not Implemented",
    hint:
      "The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).",
  },
  {
    value: 502,
    hr: "Bad Gateway",
    hint:
      "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
  },
  {
    value: 503,
    hr: "Service Unavailable",
    hint:
      "The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.",
  },
  {
    value: 504,
    hr: "Gateway Timeout",
    hint:
      "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
  },
  {
    value: 505,
    hr: "HTTP Version Not Supported",
    hint:
      "The server does not support the HTTP protocol version used in the request.",
  },
  {
    value: 506,
    hr: "Variant Also Negotiates",
    hint:
      "Transparent content negotiation for the request results in a circular reference.",
  },
  {
    value: 507,
    hr: "Insufficient Storage",
    hint:
      "The server is unable to store the representation needed to complete the request.",
  },
  {
    value: 508,
    hr: "Loop Detected",
    hint:
      "The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).",
  },
  {
    value: 510,
    hr: "Not Extended",
    hint:
      "Further extensions to the request are required for the server to fulfil it.",
  },
  {
    value: 511,
    hr: "Network Authentication Required",
    hint:
      "The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., 'captive portals' used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).",
  },

  // nginx
  {
    value: 444,
    hr: "No Response(nginx)",
    hint:
      "Used internally to instruct the server to return no information to the client and close the connection immediately.",
  },
  {
    value: 494,
    hr: "Request header too large(nginx)",
    hint: "Client sent too large request or too long header line.",
  },
  {
    value: 495,
    hr: "SSL Certificate Error(nginx)",
    hint:
      "An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.",
  },
  {
    value: 496,
    hr: "SSL Certificate Required(nginx)",
    hint:
      "An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.",
  },
  {
    value: 497,
    hr: "HTTP Request Sent to HTTPS Port(nginx)",
    hint:
      "An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.",
  },
  {
    value: 499,
    hr: "Client Closed Request(nginx)",
    hint:
      "Used when the client has closed the request before the server could send a response.",
  },

  // cloudflare
  {
    value: 520,
    hr: "Web Server Returned an Unknown Error(cloudflare)",
    hint:
      "The origin server returned an empty, unknown, or unexplained response to Cloudflare.",
  },
  {
    value: 521,
    hr: "Web Server Is Down(cloudflare)",
    hint: "The origin server has refused the connection from Cloudflare.",
  },
  {
    value: 522,
    hr: "Connection Timed Out(cloudflare)",
    hint:
      "Cloudflare could not negotiate a TCP handshake with the origin server.",
  },
  {
    value: 523,
    hr: "Origin Is Unreachable(cloudflare)",
    hint:
      "Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.",
  },
  {
    value: 524,
    hr: "A Timeout Occurred(cloudflare)",
    hint:
      "Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.",
  },
  {
    value: 525,
    hr: "SSL Handshake Failed(cloudflare)",
    hint:
      "Cloudflare could not negotiate a SSL/TLS handshake with the origin server.",
  },
  {
    value: 526,
    hr: "Invalid SSL Certificate(cloudflare)",
    hint:
      "Cloudflare could not validate the SSL certificate on the origin web server.",
  },
  {
    value: 527,
    hr: "Railgun Error(cloudflare)",
    hint:
      "Error 527 indicates an interrupted connection between Cloudflare and the origin server's Railgun server.",
  },
  {
    value: 530,
    hr: "Noname Error(cloudflare)",
    hint: "Error 530 is returned along with a 1xxx error.",
  },
];
