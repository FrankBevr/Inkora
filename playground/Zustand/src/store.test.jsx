import { useEffect } from "react";
import { expect, vi } from "vitest";
import { useTaskStore } from "./store";
import { render } from "@testing-library/react";

vi.mock('zustand')

test("sample", () => {
  expect(1).toEqual(1);
});

function TestComponent({ selector, effect }) {
  const items = useTaskStore(selector);
  useEffect(() => effect(items), [items]);
  return null;
}

test("should return default value at the start", () => {
  const selector = (store) => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test("should add an items to the store and rerun the effect", () => {
  const selector = (store) => ({
    tasks: store.tasks,
    addTask: store.addTask,
  });
  const effect = vi.fn().mockImplementation((items) => {
    if (items.tasks.length === 0) {
      items.addTask("a", "b");
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({ tasks: [{ title: "a", state: "b" }] }),
  );
});

test("should add an items to the store and rerun the effect", () => {
  const selector = (store) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });
  let createdTask = false;
  let currentItems;
  const effect = vi.fn().mockImplementation((items) => {
    currentItems = items;
    if (!createdTask) {
      items.addTask("a", "b");
      createdTask = true
    } else if (items.tasks.length === 1) {
      items.deleteTask("a");
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(currentItems.tasks).toEqual([]);
})
