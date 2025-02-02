const express = require('express')
const app = express()
const PORT = 3000
const { drivers } = require('./data')

app.use(express.json())

let rideRequests = []

// Get available drivers
app.get('/drivers', (req, res) => {
	res.json(drivers.filter((driver) => driver.available))
})

// Get ride requests
app.get('/rides', (req, res) => {
	res.json(rideRequests)
})

// Get ride details by ID
app.get('/rides/:id', (req, res) => {
	const ride = rideRequests.find((r) => r.id == req.params.id)
	if (ride) {
		res.json(ride)
	} else {
		res.status(404).json({ message: 'Ride not found' })
	}
})

// Request a new ride
app.post('/rides', (req, res) => {
	const { passenger, pickup, dropoff } = req.body
	if (!passenger || !pickup || !dropoff) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	const availableDrivers = drivers.filter((d) => d.available)
	if (availableDrivers.length === 0) {
		return res.status(400).json({ message: 'No drivers available' })
	}

	const assignedDriver =
		availableDrivers[Math.floor(Math.random() * availableDrivers.length)]
	assignedDriver.available = false

	const price = (Math.random() * (50 - 10) + 10).toFixed(2)
	const newRide = {
		id: rideRequests.length + 1,
		passenger,
		pickup,
		dropoff,
		status: 'driver_assigned',
		driver: assignedDriver,
		price,
	}

	rideRequests.push(newRide)
	res.status(201).json({ message: 'Driver assigned', ride: newRide })

	// Simulate driver arrival
	setTimeout(() => {
		newRide.status = 'driver_arrived'
		console.log(`Driver ${assignedDriver.name} has arrived.`)
	}, 5000)
})

// Start a ride
app.post('/rides/:id/start', (req, res) => {
	const ride = rideRequests.find((r) => r.id == req.params.id)
	if (ride && ride.status === 'driver_arrived') {
		ride.status = 'ongoing'
		res.json({ message: 'Ride started', ride })

		// Simulate ride progress
		setTimeout(() => {
			ride.status = 'completed'
			ride.driver.available = true
			console.log(`Ride ${ride.id} completed.`)
		}, 10000)
	} else {
		res.status(400).json({ message: 'Ride cannot be started' })
	}
})

app.listen(PORT, () => {
	console.log(`Mock server running on http://localhost:${PORT}`)
})
