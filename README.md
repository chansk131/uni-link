# Uni-link app file structure

Tabs

- Home: HomeScreenStackNavigator
- Selling: SellingScreenStackNavigator
- Add: AddItemScreen
- Notification: NotificationScreen
- My U-links: UserScreenStackNavigator

HomeScreenStackNavigator

- HomeContent: HomeScreenContent
- ItemDetail: ItemDetailScreen
- Categories: ExplorScreen

SellingScreenStackNavigator

- SellingContent: SellingContentScreen
- ListedItem: ListedItemScreen

AddItemScreen

NotificationScreen

UserScreenStackNavigator

- UserContent: UserScreen
- WishList: WishListScreen
- MyOrder: MyOrderScreen
- RecentlyViewed: RecentlyViewedScreen
- Selling: SellingScreen
- Help: HelpScreen

# Running the application
1. Download and install NodeJs: https://nodejs.org/eny/

1.1 Check node installation and version:
  Open powershell (windows) or terminal (mac) and type
  > node -v
  
  You should get v8.*.* (* means whatever number is fine).

2. Install expo
  
2.1 In powershell/terminal, type
> npm install expo-cli --global

close powershell/terminal.

3. Download this repository
  
3.1 Open the uni-link folder (this folder should contain a .git folder)
  
3.2 Open powershell/terminal inside this folder (easiest way for windows is to type powershell inside the navigation textbox of window explorer and press enter). Type in powershell/terminal.
> expo start

After a while you should see a QR Code. 

4. Use app on phone!
  
4.1 Download expo on android/ios and open
  
4.2 Scan QR Code and magic!
