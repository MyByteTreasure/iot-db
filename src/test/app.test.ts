import {helloWorld} from "../app/app";

describe("App test example", () => {

    it('should print message', function () {
        //given
        const message = "Kebab!"

        //When
        console.log = jest.fn()
        helloWorld(message)

        //Then
        expect(console.log).toBeCalledWith(message)
    });
})