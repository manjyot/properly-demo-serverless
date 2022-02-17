import { HomesService } from '../homes'
import { homes } from './utils/homes'
import dynamoDbClientMock from './utils/dynamoDbClientMock'

describe('HomesService', () => {
  const dynamoDbClient: typeof dynamoDbClientMock = dynamoDbClientMock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return all homes', async () => {
    dynamoDbClient.scan = jest.fn().mockImplementation((params) => {
      if (params.TableName === process.env.HOMES_TABLE) {
        return {
          promise: () => Promise.resolve({ Items: homes }),
        }
      }
    })

    const homesService = new HomesService(dynamoDbClient)

    const homesList = await homesService.findAll()

    expect(homesList).toEqual(homes)
  })

  it('should return a home', async () => {
    dynamoDbClient.get = jest.fn().mockImplementation((params) => {
      if (params.TableName === process.env.HOMES_TABLE) {
        return {
          promise: () =>
            Promise.resolve({
              Item: homes.find((home) => home.id === params.Key.id),
            }),
        }
      }
    })

    const homesService = new HomesService(dynamoDbClient)

    const home = await homesService.findOne('1')

    expect(home).toEqual(homes[0])
  })

  it('should create a home', async () => {
    const homeToCreate = {
      streetAddress: '56 Bathurst St.',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5V 2P7'
    }

    dynamoDbClient.put = jest.fn().mockImplementation((params) => {
      if (params.TableName === process.env.HOMES_TABLE) {
        return {
          promise: () =>
            Promise.resolve({
              Attributes: {
                id: '1',
                ...homeToCreate,
              },
            }),
        }
      }
    })

    const homesService = new HomesService(dynamoDbClient)

    const home = await homesService.create(homeToCreate)

    expect(home).toEqual({
      id: '1',
      streetAddress: '56 Bathurst St.',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5V 2P7'
    })

    expect(dynamoDbClient.put).toHaveBeenCalledTimes(1)
    expect(dynamoDbClient.put).toHaveBeenCalledWith({
      TableName: process.env.HOMES_TABLE,
      Item: {
        id: expect.any(String),
        streetAddress: '56 Bathurst St.',
        city: 'Toronto',
        province: 'ON',
        country: 'Canada',
        postalCode: 'M5V 2P7'
      },
      ReturnValues: 'ALL_OLD',
    })
  })

  it('should update a home', async () => {
    const homeToUpdate = {
      streetAddress: '56 Bathurst St.',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5V 2P7'
    }

    dynamoDbClient.update = jest.fn().mockImplementation((params) => {
      if (params.TableName === process.env.HOMES_TABLE) {
        return {
          promise: () =>
            Promise.resolve({
              Attributes: {
                id: '1',
                ...homeToUpdate,
              },
            }),
        }
      }
    })

    const homesService = new HomesService(dynamoDbClient)

    const home = await homesService.update('1', homeToUpdate)

    expect(home).toEqual({
      id: '1',
      streetAddress: '56 Bathurst St.',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5V 2P7'
    })

    expect(dynamoDbClient.update).toHaveBeenCalledTimes(1)
    expect(dynamoDbClient.update).toHaveBeenCalledWith({
      TableName: process.env.HOMES_TABLE,
      Key: {
        id: '1',
      },
      UpdateExpression:
        'SET streetAddress = :streetAddress, city = :city, province = :province, country = :country, postalCode = :postalCode',
      ExpressionAttributeValues: {
        ':streetAddress': '56 Bathurst St.',
        ':city': 'Toronto',
        ':province': 'ON',
        ':country': 'Canada',
        ':postalCode': 'M5V 2P7'
      },
      ReturnValues: 'ALL_NEW',
    })
  })

  it('should delete a home', async () => {
    dynamoDbClient.delete = jest.fn().mockImplementation((params) => {
      return {
        promise: () => Promise.resolve({}),
      }
    })

    const homesService = new HomesService(dynamoDbClient)

    await homesService.delete('1')

    expect(dynamoDbClient.delete).toHaveBeenCalledTimes(1)
    expect(dynamoDbClient.delete).toHaveBeenCalledWith({
      TableName: process.env.HOMES_TABLE,
      Key: {
        id: '1',
      },
    })
  })
})
