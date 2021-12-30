import express from 'express'

const port = 5001;
const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Fiber</title>
</head>
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
</html>
`

const app = new express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
    res.send(template)
})

app.listen(port, () => {
    console.log('server is running at ' + port)
})
