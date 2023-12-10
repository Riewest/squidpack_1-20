// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

StartupEvents.registry('item', event => {
	event.create('squid_god_tribute').unstackable()
	// Register new items here
	// event.create('example_item').displayName('Example Item')
})

StartupEvents.registry('block', event => {
	// Register new blocks here
	event.create('kilo_processor').material('stone').hardness(1.0).displayName('Kilo Processor')
	event.create('mega_processor').material('stone').hardness(1.0).displayName('Mega Processor')
	event.create('giga_processor').material('stone').hardness(1.0).displayName('Giga Processor')
})
