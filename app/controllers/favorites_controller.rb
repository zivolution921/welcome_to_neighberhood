class FavoritesController < ApplicationController    


  def index  
    @favorites = Favorite.all  
    render json: @favorites 
  end

  def show
    @favorite = Favorite.find(params[:id])
    render json: @favorite
  end

  def create  
    @favorite = Favorite.new(favorite_params)  
    if @favorite.save  
      render json: @favorite
    end  
  end  

  def update  
    @favorite = Favorite.find(params[:id])  

    if @favorite.update(favorite_params)  
      render json: @favorite
    end  
  end  

  def destroy  
    @favorite = Favorite.find(params[:id])  
    @favorite.destroy  
    render json: @favorite
  end  

  private  

  def favorite_params  
    params.require(:favorite).permit(:name, :address, :visited, :notes, :lat, :lng)  
  end  

end   