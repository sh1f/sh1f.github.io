angular.module( 'app', ['ngRoute'] )
.config( function( $routeProvider )
{
    $routeProvider.
    when( '/:postSlug',
    {
        controller: 'PostCtrl',
        template: '<div ng-bind-html="post.contents"></div>'
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
.controller( 'PostCtrl', function( $scope, $routeParams, $sce, PostService )
{
    $scope.post = {contents:''};

    PostService.getPost( $routeParams.postSlug, function( post )
    {
        $scope.post = post;
        $scope.post.contents = $sce.trustAsHtml( $scope.post.contents );
    });
});