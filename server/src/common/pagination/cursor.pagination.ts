export type CursorInput = {
  createdAt: Date;
  id: string;
};

export function encodeCursor(cursor: CursorInput) {
  return Buffer.from(JSON.stringify({ createdAt: cursor.createdAt.toISOString(), id: cursor.id })).toString("base64url");
}

export function decodeCursor(cursor?: string | null): CursorInput | null {
  if (!cursor) {
    return null;
  }

  const parsed = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as {
    createdAt: string;
    id: string;
  };

  return {
    createdAt: new Date(parsed.createdAt),
    id: parsed.id,
  };
}
