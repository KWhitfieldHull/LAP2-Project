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

    describe('update', () => {
        it('modifies a row in the database', async () => {
            const testItem = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
            jest.spyOn(Item, 'getOneById')
                .mockResolvedValue(new Item(testItem))

            const mockReq = { params: { id: 1 }, body: { name: 'something else' } }

            jest.spyOn(Item, 'updateItem')
                .mockResolvedValue({ ...new Item(testItem), name: 'something else' })

            await itemsController.update(mockReq, mockRes)


            expect(Item.getOneById).toHaveBeenCalledTimes(1)
            expect(Item.updateItem).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })



    //NEEDS FIXING
    describe('destroy', () => {
        it('returns a 204 status code on successful deletion', async () => {
          const testItem = { item_id: 1, name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
          jest.spyOn(Item, 'getOneById')
            .mockResolvedValue(new Item(testItem))
    
          jest.spyOn(Item, 'destroy')
            .mockResolvedValue(new Item(testItem))
    
          const mockReq = { params: { item_id: 1 } }
          await itemsController.destroy(mockReq, mockRes)
    
          expect(Item.getOneById).toHaveBeenCalledTimes(1)
          expect(Item.destroy).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(204)
          expect(mockEnd).toHaveBeenCalledWith()
        })
    
        it('calls item.destroy()', async () => {
          const mockReq = { params: { id: 49 } }
    
          jest.spyOn(Item, 'getOneById')
            .mockRejectedValue(new Error('item not found'))
    
          await itemsController.destroy(mockReq, mockRes)
          expect(mockStatus).toHaveBeenCalledWith(404)
          //expect(mockSend).toHaveBeenCalledWith({ error: 'item not found' })
        })
      })




})