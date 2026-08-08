import clsx from "clsx";

export default function Table({ children, className, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={clsx(
          "w-full border-collapse text-sm",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

Table.Header = function TableHeader({ children, className }) {
  return (
    <thead>
      <tr className={clsx("border-b bg-gray-50", className)}>
        {children}
      </tr>
    </thead>
  );
};

Table.Body = function TableBody({ children, className }) {
  return (
    <tbody
      className={clsx("divide-y", className)}
    >
      {children}
    </tbody>
  );
};

Table.Row = function TableRow({ children, className, ...props }) {
  return (
    <tr
      className={clsx("hover:bg-gray-50/50", className)}
      {...props}
    >
      {children}
    </tr>
  );
};

Table.Head = function TableHead({ children, className, ...props }) {
  return (
    <th
      className={clsx(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

Table.Cell = function TableCell({ children, className, ...props }) {
  return (
    <td
      className={clsx("px-4 py-3 align-top", className)}
      {...props}
    >
      {children}
    </td>
  );
};
