export type Column = {
  name: string, type: string
};

export const typesMap: { [id: string]: string } = {
  'int': '0',
  'string': '\'\'',
  'datetime': '\'1900-01-01\'',
  'date': '\'1900-01-01\'',
  'bit': '0',
  'decimal': '0',
  'numeric': '0',
  'float': '0',
  'money': '0',
  'smallint': '0',
  'tinyint': '0',
  'bigint': '0',
  'nvarchar': '\'\'',
}

export function mapTypes(type: string, forND: boolean = false): string {
  // remove [ ] from type
  const res = typesMap[type.replace('[', '').replace(']', '')];
  if (!res) {
    throw new Error(`Type ${type} not found`);
  }
  if (forND && res == '\'\'')
    return '\'NA\'';
  return res;
}

export function getColumnsAndTypesx(input: string): Column[] {
  return input.split('\n').map(f => {
    const [name, type] = f.trim().split(' ').splice(0,2);
    return { name: name.trim(), type: type.trim() };
  });
}