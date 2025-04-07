const parseResponse = async (response, status, data = null, message = '') => {
    const responseObj = {
        message,
    };

    // Handling error status codes (4xx and 5xx)
    if (status >= 400) {
        const errorMessages = {
            400: 'Bad Request',
            401: 'Unauthorized',
            404: 'Not Found',
        };

        // Set default error message if no specific message for the status
        responseObj.error = errorMessages[status] || 'An error occurred';
        return response.status(status).json(responseObj);
    }

    // Handling successful status codes (2xx)
    if (status >= 200 && status < 300) {
        responseObj.data = data;
        return response.status(status).json(responseObj);
    }

    // Fallback: generic error handling for unexpected status codes
    responseObj.error = 'Unexpected Error';
    return response.status(status).json(responseObj);
};

module.exports = parseResponse;
