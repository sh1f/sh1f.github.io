angular.module( 'app', ['ngRoute'] )
.config( function( $routeProvider )
{
    $routeProvider.
    when( '/:postSlug',
    {
        controller: 'PostCtrl',
        template: '{{test}}<div ng-bind-html-unsafe="post.contents"></div>'
    });
})
.service( 'PostService', function( $http )
{
    this.getPost = function( postSlug, callback )
    {
        $http.get( 'posts.json' )
        .success( function( posts )
        {
            $http.get( '/posts/' + postSlug + '.mkd' )
            .success( function( content )
            {
                var contentHtml = new Showdown.converter().makeHtml( content );

                posts[ postSlug ].contents = contentHtml;

                callback( posts[ postSlug ] );
            });
        });
    }
})
.controller( 'PostCtrl', function( $scope, $routeParams, PostService )
{
    $scope.test = 'holla';
    $scope.post = {contents:''};

    PostService.getPost( $routeParams.postSlug, function( post )
    {
        $scope.post = post;
    });
});