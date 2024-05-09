export function reviver(value: string | Buffer): string {
  if (Buffer.isBuffer(value)) {
    return value.toString();
  }

  return value;
}
