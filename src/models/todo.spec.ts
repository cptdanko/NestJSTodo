import { Todo } from './todo';

describe('Todo', () => {
  it('can be created with just 2 params', () => {
    expect(new Todo(12, "asdasd")).toBeDefined();
  });
});
