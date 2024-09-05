import * as elements from 'typed-html';

export const Button = ({ name }: { name: string }) => {
  return (
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {name}
    </button>
  );
};
