export default function Copyright() {
  const copyright = new Date().getFullYear() + ' ';

  return (
    <p className="copyright">
      &copy; <span>{copyright}</span>Ryan Tremmel
    </p>
  );
}
