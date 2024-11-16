# Instructions

1. create a lib to use viem to call the getContractEvents function for the MintComment event
2. Token component calls the lib function for each token in the feed.
3. create a hook useComments to fetch the comments for a token.
4. Display the comments underneath its respective token.
5. display how long ago the comment was left. ex. 3 sec ago, 1 day ago, 4 hours ago
6. reverse the current ordering of the comments. latest comment should be highest in the rendered UI list
7. Only show the first 3 comments. Add a button to view the next 3 comments.
8. Comments are left on the correct tokenId. currently, all comments are left on tokenId 1.
9. add a comment button to the token component to write the comment.
10. Use the text input in the Crossmint purchase component so the created comment is not hard-coded.
