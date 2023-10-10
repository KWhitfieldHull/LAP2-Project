const itemsController = require("../../../controllers/items")
const Item = require("../../../models/Item")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("items controller", () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe("index", () => {
        it("should return items with a status code 200", async () => {
            const testItems = ["g1", "g2"]
            jest.spyOn(Item, "getAll")
                .mockResolvedValue(testItems)
            await itemsController.index(null, mockRes)
            expect(Item.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({ data: testItems })
        })
        it("sends an error upon failure", async () => {
            jest.spyOn(Item, "getAll")
                .mockRejectedValue(new Error("Something happened to your db"))
            await itemsController.index(null, mockRes)
            expect(Item.getAll).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({error: "Something happened to your db"})
        })
    })

   



})