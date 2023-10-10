const Item = require("../../../models/Item")
const db = require("../../../database/connect_user")




describe('getAll', () => {
  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())
    it('resolves with items on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{ name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }, { name: 'g2', category: 'c2', user_id: 2, image_url: 'u2', description: 'd2' }, { name: 'g3', category: 'c3', user_id: 3, image_url: 'u3', description: 'd3' }]
        })

      const items = await Item.getAll()
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveProperty('id')
    })

    it('should throw an Error on db query error', async () => {
     

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await Item.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("No items available.")
      }
    })
  })

  describe('getOneById', () => {
    it('resolves with item on successful db query', async () => {
      let testItem = { item_id: 1,name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testItem] })

      const result = await Item.getOneById(1)
      expect(result).toBeInstanceOf(Item)
      expect(result.name).toBe('g1')
      expect(result.id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('This item does not exist!'))

      try {
        await Item.getOneById('red')
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('This item does not exist!')
      }
    })
  })



  describe('create', () => {
    it('resolves with goat on successful db query', async () => {
      let itemData = { item_id: 1,name: 'g1', category: 'c1', user_id: 1, image_url: 'u1', description: 'd1' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...itemData, item_id: 1 }] });

      const result = await Item.create(itemData);
      expect(result).toBeTruthy()
      expect(result).toHaveProperty('item_id')
      expect(result).toHaveProperty('name')
    })

    it('should throw an Error on db query error', async () => {

      try {
        await Item.create({ name: "plum" })
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('This item does not exist!')
      }
    })
  })