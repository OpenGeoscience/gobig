
{% for host in play_hosts if not loop.first %}
{%- set ip=hostvars[host]
                   [mongodb_net_interface]
                   ["ipv4"]
                   ["address"] %}
rs.remove("{{ ip }}");
{% endfor %}

