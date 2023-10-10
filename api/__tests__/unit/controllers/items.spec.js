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
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your db" })
        })
    })


    describe("show", () => {
        it("should return an item with a status code 200", async () => {
            const testItems = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            jest.spyOn(Item, "getOneById")
                .mockResolvedValue(testItems)

            const mockRequest = (idp) => {
                return {
                    params: { id: idp }
                }
            }
            testReq = mockRequest(1)
            await itemsController.show(testReq, mockRes)
            expect(Item.getOneById).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ data: testItems })
        })
        it("sends an error upon failure", async () => {
            jest.spyOn(Item, "getOneById")
                .mockRejectedValue(new Error("Something happened to your db"))

            const mockRequest = (idp) => {
                return {
                    params: { id: idp }
                }
            }
            testReq = mockRequest("uhoh")
            await itemsController.show(testReq, mockRes)
            expect(Item.getOneById).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your db" })
        })
    })



    describe("create", () => {
        it("should return an item with a status code 200", async () => {
            const testItems = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            jest.spyOn(Item, "create")
                .mockResolvedValue(testItems)

            const mockRequest = () => {
                return {
                    body: { testItems }
                }
            }
            mockReq = mockRequest()
            await itemsController.create(mockReq, mockRes)
            expect(Item.create).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ data: testItems })
        })
        it("sends an error upon failure", async () => {
            jest.spyOn(Item, "create")
                .mockRejectedValue(new Error("Something happened to your db"))
            const testItems = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            const mockRequest = () => {
                return {
                    body: { testItems }
                }
            }
            testReq = mockRequest()
            await itemsController.create(testReq, mockRes)
            expect(Item.create).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your db" })
        })
    })

    describe("update", () => {
        it("should return an item with a status code 200", async () => {
            const testItems = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            jest.spyOn(Item, "update")
                .mockResolvedValue(testItems)

            const mockRequest = () => {
                return {
                    body: { testItems }
                }
            }
            mockReq = mockRequest()
            await itemsController.update(mockReq, mockRes)

            expect(Item.update).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ data: testItems })
        })
        it("sends an error upon failure", async () => {
            jest.spyOn(Item, "update")
                .mockRejectedValue(new Error("Something happened to your db"))
            const testItems = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            const mockRequest = () => {
                return {
                    body: { testItems }
                }
            }
            testReq = mockRequest()
            await itemsController.update(testReq, mockRes)
            expect(Item.update).toHaveBeenCalledTimes(1)
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your db" })
        })
    })






})