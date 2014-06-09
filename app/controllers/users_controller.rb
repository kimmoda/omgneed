class UsersController < ApplicationController
  # before_action :set_user, only: [  :edit, :delete]
  respond_to :json, :html

 def show
  set_user
 end

  def edit
  end

  def new
  	@user = User.new
  end

  def index
      
      @imports = Product.party(params[:limit], params[:category], params[:search])
      respond_with current_user
  end

  def create
    @user = User.new(user_params)
      if @user.save
        respond_to do |format|
          format.html { redirect_to (users_path)}
          format.json { render json: @user, status: :created}
        end
      else
        respond_to do |format|
          format.html { render 'new' }
          format.json { render json: @user.errors, status: :unprocessable_entity}
        end
      end
  end

  def update
    if current_user.update_attributes(user_params)
       respond_to do |format|
          format.html { redirect_to users_path }
          format.json { render nothing: true, status: :no_content}
        end
      else
        respond_to do |format|
          format.html { render edit_user_path }
          format.json { render json: @user.errors, status: :unprocessable_entity}
        end
    end
  end

  def destroy
    current_user.destroy
    respond_to do |format|
      format.html { redirect_to "#"}
      format.json { render json: { head: :ok } }
    end
  end 

  protected

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
  end
end
