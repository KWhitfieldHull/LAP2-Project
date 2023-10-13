const Item = require("../../../models/Item")
const db = require("../../../database/connect")




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
    it('resolves with item on successful db query', async () => {
      let itemData = { name: 'g1', user_id: 1, image_url: 'u1', description: 'd1',category_id: 1 }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...itemData, item_id: 1 }] });
  
        const result = await Item.create(itemData);
        console.log(result)
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


  describe('getOneByCategory', () => {
    it('resolves with items on successful db query', async () => {
      let testGoat = { item_id: 1, name: 'g1', user_id: 1, image_url: 'u1', description: 'd1',category: 'c1' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testGoat] })

      const result = await Item.getOneByCategory("c1")
      expect(result[0]).toBeInstanceOf(Item)
      expect(result[0].name).toBe('g1')
      expect(result[0].id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('There are no items with this category!'))

      try {
        await Item.getOneByCategory(1)
      } catch (error) {
        
        expect(error).toBeTruthy()
        expect(error.message).toBe('There are no items with this category!')
      }
    })
  })

  describe('update', () => {
    it('should throw an error if stuff is missing', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to update item'))
      try {
        const item = new Item({ item_id: 1, name: 'g1', user_id: 1, image_url: 'u1', description: 'd1',category: 'c1' })
        await Item.updateItem({ name: 'puppet' })
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Unable to update item')
      }
    })
  })



  describe('destroy', () => {
    it('should return the deleted item', async () => {
      const item = new Item({})
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ item_id: 1, name: 'g1', user_id: 1, image_url: 'u1', description: 'd1',category: 'c1' }] })

      const result = await item.destroy(1)

      expect(result).toBeInstanceOf(Item)
      expect(result.id).toBe(1)
      expect(result).not.toEqual(item)
    })

    it('should throw an error if we cannot locate the item', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{}, {}] })

      try {
        const item = new Item({name: 'g1', user_id: 1, image_url: 'u1', description: 'd1',category: 'c1' })
        await item.destroy({ name: 'puppet' })
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })









