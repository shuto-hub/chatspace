class MessagesController < ApplicationController
  def index
  end

  def new
    @message = message.new
  end
end
