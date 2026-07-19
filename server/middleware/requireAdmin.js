// Guards the write routes (edit project, upload video) with a simple shared
// key. The key lives in server/.env and is sent by the browser in the
// x-admin-key header. Good enough for a personal site where only the owner
// edits content; swap for real auth if this ever needs multiple users.
export default function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ error: 'ADMIN_KEY is not set in server/.env' });
  }
  if (req.header('x-admin-key') !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Wrong admin key' });
  }
  next();
}
