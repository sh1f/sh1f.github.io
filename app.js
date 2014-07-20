angular.module( 'app', ['ngRoute'] )
.config( function( $routeProvider )
{
    $routeProvider.
    when( '/:postSlug',
    {
        controller: 'PostCtrl',
        template: '{{post.contents}}'
    });
})
.service( 'PostService', function( $http )
{
    this.posts = undefined;
    var that = this;


    this.getPosts = function()
    {
        if( typeof this.posts === 'undefined' )
        {
            $http.get( 'posts.json' ).success( function( data )
            {
                that.posts = data;
            });
        }

        return this.posts;
    };


    this.getPost = function( postSlug, callback )
    {
        this.getPosts();

        $http.get( '/posts/' + postSlug + '.mkd').success( function( data )
        {
            that.posts[ postSlug ].contents = data;

            callback( that.posts[ postSlug ] );
        });
    }
})
.controller( 'PostCtrl', function( $scope, $routeParams, PostService )
{
    PostService.getPost( $routeParams.postSlug, function( post )
    {
        alert( "hi" );
        $scope.post = post;
    });
});