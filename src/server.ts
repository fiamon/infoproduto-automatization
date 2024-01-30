import app from './app';
import { env } from './env';

app.listen(env.PORT, (): void => {
    console.log(`🚀 Server running on port ${env.PORT}`);
});
