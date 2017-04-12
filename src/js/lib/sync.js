/**
 * Created by jason on 16/5/11.
 */
const urls = {
    signIn: '/auth/sign_in',
    forbidden: '/errors/403',
    internalServerError: '/errors/500',
    notFound: '/errors/404'
};

const ResponseCode = {
    SUCCESS: 0,
    VALIDATION_ERROR: 100005
};


function Response(code, msg, data) {
    this.code = code != null ? code : null;
    this.msg = msg != null ? msg : null;
    this.data = data != null ? data : null;
}

const handleResponse = function (response, handler) {
    var result = null;
    // 如果提供了回调函数,则优先进入回调函数逻辑
    if (typeof handler === 'function') {
        result = handler.call(this, response);
    }
    // 如果已经有回调handler处理过,则直接返回处理结果,不在处理
    if (result != null) {
        return result;
    }
    // 如果尚未处理,则进入通用处理逻辑
    switch (response.code) {
        case ResponseCode.SUCCESS :
            result = response.data;
            break;
        case ResponseCode.VALIDATION_ERROR :
            result = response;
            break;
        case 400:
        case 404:
            result = response;
            window.location.href = urls.notFound;
            break;
        case 401 :
            result = response;
            window.location.href = urls.signIn;
            break;
        case 403 :
            result = response;
            window.location.href = urls.forbidden;
            break;
        case 500 :
            result = response;
            window.location.href = urls.internalServerError;
            break;
        default :
            if (response.code >= 400 && response.code < 500) {
                window.location.href = urls.notFound;
            }
            if (response.code > 500 && response.code < 599) {
                window.location.href = urls.internalServerError;
            }
        // DO NOTHING
    }
    return result;
};

function parseQueryParams(data) {
    let queryStr = "";
    if(data) {
        queryStr += "?";
        for(let p in data) {
            if(data[p] != null) {
                queryStr += encodeURIComponent(p) + "=" + encodeURIComponent(data[p]) + "&";
            }
        }
    }
    queryStr = queryStr.slice(0, queryStr.length - 1);
    return queryStr;
}

export function syncGet(options) {
    let result = null;
    options.type = "GET";
    options.async = false;
    if(options.data) {
        options.url = options.url + parseQueryParams(options.data);
    }
    options.success = function(response) {
        result = handleResponse(response, options.handler);
    };
    options.error = function(response) {
        result = handleResponse(new Response(response.status, response.responseText), options.handler);
    };
    $.ajax(options);
    return result;
}

export function syncPost(options) {
    let result = null;
    options.type = "POST";
    options.dataType = "json";
    options.contentType = "application/json";
    options.data = JSON.stringify(options.data);
    options.async = false;
    options.success = function(response) {
        result = handleResponse(response, options.handler);
    };
    options.error = function(response) {
        result = handleResponse(new Response(response.status, response.responseText), options.handler);
    };
    $.ajax(options);
    return result;
}

export function syncDelete(options) {
    let result = null;
    options.type = "DELETE";
    options.dataType = "json";
    options.async = false;
    options.success = function(response) {
        result = handleResponse(response, options.handler);
    };
    options.error = function(response) {
        result = handleResponse(new Response(response.status, response.responseText), options.handler);
    };
    $.ajax(options);
    return result;
}

export default function(method, options) {
    let result = null;
    switch(method) {
        case "GET":
            result = syncGet(options);
            break;
        case "POST":
            result = syncPost(options);
            break;
        case "DELETE":
            result = syncDelete(options);
            break;
        default:
            result = null;
    }
    return result;
}
