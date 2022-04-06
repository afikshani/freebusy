const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

try {
    app.use(require('./Routes'));
    app.listen(PORT, () => {
        console.log(`Free busy mixer service listening on port: ${PORT}`);
    });

} catch(err) {
    console.error(err.stack);
    process.exit(1);
}
