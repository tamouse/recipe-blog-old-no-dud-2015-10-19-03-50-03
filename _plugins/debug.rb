require 'pry'
module Jekyll
  class DebugTag < Liquid::Tag
    def initialize(tagname, text, tokens)
      super
      @text = text
    end
    def render(context)
      binding.pry
    end
  end
end
Liquid::Template.register_tag('debug', Jekyll::DebugTag)


