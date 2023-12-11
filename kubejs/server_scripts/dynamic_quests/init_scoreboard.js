ServerEvents.loaded(event => {
    //Server first load warning
    if (!event.server.persistentData.contains('firstload')) {
        event.server.persistentData.putBoolean('firstload', true)
        console.warn('First server load! Setting up scoreboards...')
        event.server.runCommandSilent('scoreboard objectives add first_completions dummy "First Completions"')
        event.server.runCommandSilent('scoreboard objectives add tech dummy "Techno Score"')
        event.server.runCommandSilent('scoreboard objectives add magic dummy "Magical Score"')
        event.server.runCommandSilent('scoreboard objectives add vanilla dummy "Vanilla Score"')
        event.server.runCommandSilent('scoreboard objectives add total dummy "Total Score"')
        event.server.runCommandSilent('scoreboard objectives setdisplay sidebar total')
    }
})