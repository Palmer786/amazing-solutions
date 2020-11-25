import delay from './delay';
import {searchSpaces} from "./service/search";

test('delay', async() => {
    const mockFn = jest.fn().mockImplementation(async () => null );
    await searchSpaces("")
        .then(async () => await delay(500))
        .then(mockFn)
    expect(mockFn).toBeCalledTimes(1)
});
