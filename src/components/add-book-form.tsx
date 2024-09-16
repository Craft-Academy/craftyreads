import * as elements from 'typed-html';
import { Button } from './button';
import { Toast } from './toast';

export const AddBookForm = ({
  inputPlaceholder,
  toast,
}: {
  inputPlaceholder: string;
  toast?: {
    type: 'error' | 'success';
    title: string;
    message: string;
  };
}) => {
  return (
    <div id="add-book-form">
      <form
        action="/"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        method="post"
        hx-boost="true"
        hx-target="#add-book-form"
        hx-swap="outerHTML"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            placeholder={inputPlaceholder}
            required="required"
          />
        </div>
        <Button name="Add Book" type="submit" />
      </form>
      {toast && (
        <Toast title={toast.title} message={toast.message} type={toast.type} />
      )}
    </div>
  );
};
