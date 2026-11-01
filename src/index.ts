import net from 'net';

const host = process.argv[2] || '127.0.0.1';
const start = Number(process.argv[3]) || 1;
const end = Number(process.argv[4]) || 1024;
const timeout = 500;

function check(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const s = net.createConnection({ host, port });
    s.setTimeout(timeout);
    s.on('connect', () => { s.destroy(); resolve(true); });
    s.on('timeout', () => { s.destroy(); resolve(false); });
    s.on('error', () => resolve(false));
  });
}

(async () => {
  const open: number[] = [];
  for (let p = start; p <= end; p++) {
    if (await check(p)) { open.push(p); console.log('open', p); }
  }
  console.log('done. open ports:', open.join(', ') || 'none');
})();
