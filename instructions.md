# Instructions

## Goal: One Click Zora Collection Setup

1. /collect - Create a new route matching the route for zora collections

- ex. https://zora.co/collect/base:0x0D78F67681283613c8350047Ddb623F81B6B1c5C/

2. Add a component for FeedPage
3. Add a token page route which uses the same page rendering as the collection page. /collect/[collection]/[tokenId]
4. Display the dynamic collection data for the collection displayed
5. Support any collection on Zora, Base, OP or their testnets.
6. Styling - import the collection styling by using viem to query the getJSONExtension function on the JSONExtensionRegistry contract

- Base / Zora JSONExtensionRegistry - 0xabcdefed93200601e1dfe26d6644758801d732e8

7. Styling - implement the styling colors, borderRadius, fontSize, and other customized information. If not present, use a simple default.
8. /create - Create a new route for creating a new feed from a zora collection
9. /create - add an input to enter a zora collection url
10. /create - onEnter - open a new tab with the collect route for the URL entered (see step 1)
11. update the landing page by coping the contents from Myco.wtf codebase

- codebase to copy from: https://github.com/SweetmanTech/myco-landing-page
