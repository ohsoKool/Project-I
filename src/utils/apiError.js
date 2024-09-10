class apiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        stack="",
        error=[]
    ){
        super(message)
        this.statusCode=statusCode
        this.message=message
        this.success=false;
        this.data=null
        this.error=error
    }
}

export {apiError}