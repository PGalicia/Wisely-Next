# Wisely

### Description:
A web application that takes your “spending money” and allocate it to the items you want to use the money on. This particular repo is for the FE side of the project. You can check the BE code [here](https://github.com/PGalicia/Wisely-Express).

[Check it out](https://wisely-next.vercel.app/demo)

### How It Works:
The web app allows its users to input the items that they want to save up for. The spending money is then allocated to the items the users listed, prioritizing items with higher priority. For example, consider you have a spending money of $100 and three items with their corresponding cost: Item A($50), Item B($75), Item C($30). Item A will then be set to have priority "High", which is the highest priority, and the other two items will be set to the default priority, which is the "Medium" priority. The spending money will then prioritize allocating to Item A and once its complete it will then allocate the rest of the money to the next priority item, in this case, Item B and Item C. Since the last two items have the same priority, the app will prioritize the more expensive item.

This web app is a refresh of an old project of mine to utilize more modern frameworks/libraries. If you are interested in that you can check out this [repo])(https://github.com/PGalicia/Wisely).

_Note: This is still an ongoing project and you can see some of the improvements and features I want to add [here](https://trello.com/b/fhsavuoY/budget-planner)._
