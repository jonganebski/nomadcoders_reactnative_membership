import { ObjectSchema, ObjectSchemaProperty } from 'realm';

export class Feeling {
  public _id: number = 0;
  public message: string = '';
  public emotion: string = '';

  public static Schema: ObjectSchema = {
    name: 'Feeling',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      message: 'string',
      emotion: 'string',
    },
  };
}
