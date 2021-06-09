function quotes() {
	//Creating an array to store quotes
	var quotes = new Array();
	quotes[0] = "Be the change that you wish to see in the world.";
	quotes[1] = "The way I see it, if you want the rainbow, you gotta put up with the rain.";
	quotes[2] = "You do not find the happy life. You make it!";
	quotes[3] = "You will face many defeats in life, but never let yourself be defeated.";
	quotes[4] = "All we have is now.";
	quotes[5] = "When you focus on the good, the good gets better.";
	quotes[6] = "It's okay to struggle. It's not okay to give up.";
	quotes[7] = "Doubt kills more dreams than failure ever will.";
	quotes[8] = "Life has no limitations, except the ones you make.";
	quotes[9] = "The purpose of our life is to be happy.";
	quotes[10] = "Life is what happens when you're busy making other plans.";
	quotes[11] = "Life is not a problem to be solved, but a reality to be experienced.";
	quotes[12] = "Life is like riding a bicycle. To keep your balance, you must keep moving.";
	quotes[13] = "My mama always said, life is like a box of chocolates. You never know what you're gonna get.";
	quotes[14] = "The best way to predict your future is to create it.";
	quotes[15] = "It is our choices that show what we truly are, far mroe than our abilities.";
	quotes[16] = "There are no mistakes, only opportunities.";
	quotes[17] = "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.";
	quotes[18] = "Be nice to people on the way up, because you may meet them on the way down.";
	quotes[19] = "When we strive to become better than we are, everything around us becomes better too."

	// Generate an index so that we can get a random quote
	index = Math.floor(Math.random() * quotes.length);


	document.getElementById("quote").innerHTML = quotes[index];

}