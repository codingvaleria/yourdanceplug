class InMemoryDatabase {
  constructor() {
    this.tables = {};
    this.lastIds = {};
  }

  select(tableName) {
    if (this.tables[tableName]) {
      return this.tables[tableName];
    } else {
      return [];
    }
  }

  selectById(tableName, id) {
    const table = this.tables[tableName];
    if (table) {
      return table.find((entry) => entry.id === id) || null;
    } else {
      return null;
    }
  }

  update(tableName, id, data) {
    const table = this.tables[tableName];
    if (table) {
      const entry = table.find((entry) => entry.id === id);
      const now = new Date().toString();
      if (entry) {
        Object.assign(entry, { ...data, updatedAt: now });
        return true;
      }
    }
    return false;
  }

  insert(tableName, data) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      this.lastIds[tableName] = 0;
    }
    const nextId = this.lastIds[tableName] + 1;
    const now = new Date().toString();
    const entry = { id: nextId, ...data, createdAt: now, updatedAt: now };
    this.tables[tableName].push(entry);
    this.lastIds[tableName] = nextId;
    return nextId;
  }

  delete(tableName, id) {
    const table = this.tables[tableName];
    if (table) {
      const index = table.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        table.splice(index, 1);
        return true;
      }
    }
    return false;
  }
}

const db = new InMemoryDatabase();

export default db;
