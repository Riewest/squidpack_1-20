PlayerEvents.loggedIn( event => {

    const player_name = event.player.getName().getString()              //assign player name string to player_name

    // Check if player doesn't have "starting_kit" stage yet. Players joining the server for the first time will not have this stage
    if (!event.player.stages.has('starting_kit')) {
      
      event.player.stages.add('starting_kit')                     // Add the stage so this doesn't trigger again next time the same player joins

      event.server.runCommandSilent('clear ' + player_name)
      event.server.runCommandSilent('')


    }
  })