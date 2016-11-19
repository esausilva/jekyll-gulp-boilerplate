module Jekyll
  module TrimFilter
    def trim(input)
      input.strip
    end
  end
end

Liquid::Template.register_filter(Jekyll::TrimFilter)
