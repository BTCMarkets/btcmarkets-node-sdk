import { generateMessage, signMessage } from '../src/helpers/authHelpers';
import { HttpMethods } from '../src/constants/HttpMethods';
import { API_VERSION } from '../src/constants';

const request = {
    now: 1569349976622,
    method: HttpMethods.GET,
    path: '/testpath',
    data: {
        firstName: 'test first name',
        lastName: 'test last name',
    },
    privateKey: 'myPrivateKey',
};

test('should generated message be correct without data', function() {
    const message = generateMessage(request.method, request.path, null, request.now);
    const expectedResult = request.method + API_VERSION + request.path + request.now;
    expect(message).toBe(expectedResult);
});

test('should generated message be correct with data', function() {
    const message = generateMessage(request.method, request.path, request.data, request.now);
    const expectedResult = request.method + API_VERSION + request.path + request.now + JSON.stringify(request.data);
    expect(message).toBe(expectedResult);
});

test('should signMessage be correct', function() {
    const message = generateMessage(request.method, request.path, request.data, request.now);
    const signedMessage = signMessage(request.privateKey, message);
    expect(signedMessage).toBe(
        'QNZzyrw1pVzc+N7qJFgj5MBGJwp/pm5sxHnm05zgsBpA0TOK0v0KcRIVyDvE+ut+P+D2xnK+SasUDFtXr/AJzA=='
    );
});
