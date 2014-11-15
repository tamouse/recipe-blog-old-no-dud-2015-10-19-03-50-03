#!/usr/bin/env ruby
require "stringex_lite"

def convert_body(line)
  line.gsub("%3c",'<').gsub("%0a","\n").gsub("%25",'%')
end

def postname(content)
  "#{content['date'].strftime("%Y-%m-%d")}-#{content['name'].to_url}.markdown"
rescue => e
  $stderr.puts "Problem with file #{content['filename']}: #{e}"
  $stderr.puts "date: #{content['date']}"
end

filename = ARGV.shift
content = {'filename' => filename}

File.open(filename, "rb").each_line do |line|
  line.chomp!
  content['date'] = Time.at(line.match(/^ctime=(\d+)/)[1].to_i) if line =~ /^ctime=/
  content['name']  = line.rpartition('.').last.gsub(/([A-Z])/,' \1').sub(/^ /,'') if line =~ /^name=/
  content['body']  = convert_body(line.partition('=').last) if line =~ /^text=/
end

puts "Writing #{content['name']} to #{postname(content)}"

File.open(postname(content),'wb') do |post|
  post.puts '---'
  post.puts 'layout: post'
  post.puts "title: \"#{content['name']}\""
  post.puts "date: #{content['date']}"
  post.puts '---'
  post.write(content['body'])
  post.puts
end


  
