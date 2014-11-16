#!/usr/bin/env ruby

filename = ARGV.shift

content = ''

File.open(filename,'r') do |f|
  f.each_char do |c|
    if c.valid_encoding?
      content << c
    else
      print "Found the culprit!!\n\n"
      puts filename
      puts
      print content
      puts "\n\n"
      exit -1
    end
  end
end
