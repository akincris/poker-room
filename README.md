# Poker Room

## How to Install / Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akincris/poker-room.git
   cd poker-room

2. **Install dependencies:**
     ```bash
      npm install

3. **Run on development:**
     ```bash
      npm run dev


4. **Optional:**
     There's a .env.sample file that you can use to create an .env file and set the min and max players per room. By default it will be min 3 and max 5 players.


## How to Use
 1. Once navigating to the "Lobby Room" user will be prompted to type in their name to enter a room. Name should include at least one letter.

2. Once in a room there will be 52 cards displayed for user to choose, on the left side the list of the other players is displayed along with a check mark near the ones who already voted.

3. Once selecting the card and voting, if the minimum required players are not in the room there will be a pulse animation while awaiting others. Otherwise the cards will be revealead right away. 

4. Users can see the cards that were picked by other players marked by red and unable to select them.

5. Using the header, user can toggle the theme, reset votes or leave the room.