angular.module( 'app' )
.config( function( $routeProvider )
{
    $routeProvider.
    when( '/:postSlug',
    {
        controller: 'PostCtrl'
    });
})
.service( 'PostService', function( $http )
{
    this.posts = undefined;


    this.getPosts = function()
    {
        if( typeof this.posts === 'undefined' )
        {
            $http.get( 'posts.json' ).success( function( data )
            {
                this.posts = data;
            });
        }

        return this.posts;
    };


    this.getPost = function( postSlug )
    {
        this.getPosts();

        $http.get( '/posts/' + postSlug + '.mkd').success( function( data )
        {
            this.posts[ postSlug ].contents = data;
        });

        return this.posts[ postSlug ];
    }
})
.controller( 'PostCtrl', function( $scope, $routeParams, PostService )
{
    $scope.post = PostService.getPost( $routeParams.postSlug );
});